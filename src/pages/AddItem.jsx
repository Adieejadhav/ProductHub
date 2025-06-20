import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "../stylings/AddItem.css";

const AddItem = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [coverName, setCoverName] = useState("");
  const [additionalNames, setAdditionalNames] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const imgbbAPI = "564325e3f06c5207e001fcbbd468603d";

  const uploadToImgBB = async (file) => {
    const form = new FormData();
    form.append("image", file);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPI}`, {
      method: "POST",
      body: form
    });
    const data = await response.json();
    return data.data.url;
  };

  const onSubmit = async (data) => {
    setUploading(true);
    setSuccessMsg("");

    try {
      // Upload Cover Image
      const coverFile = data.coverImage[0];
      const coverUrl = await uploadToImgBB(coverFile);

      // Upload Additional Images
      const additionalUrls = [];
      if (data.additionalImages && data.additionalImages.length > 0) {
        for (let img of data.additionalImages) {
          const url = await uploadToImgBB(img);
          additionalUrls.push(url);
        }
      }

      // Save to Firestore
      await addDoc(collection(db, "items"), {
        itemName: data.itemName,
        itemType: data.itemType,
        itemDescription: data.itemDescription,
        coverUrl,
        additionalUrls,
        createdAt: Timestamp.now()
      });

      setSuccessMsg("✅ Item successfully added!");
      setCoverName("");
      setAdditionalNames([]);
      reset();
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Something went wrong while uploading. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="form-heading">Add New Item</h2>
      <form className="styled-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Item Name */}
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            className="input-field"
            placeholder=" "
            {...register("itemName", { required: "Item name is required" })}
          />
          {errors.itemName && <p className="error">{errors.itemName.message}</p>}
        </div>

        {/* Item Type */}
        <div className="form-group">
          <label>Item Type</label>
          <input
            type="text"
            className="input-field"
            placeholder=" "
            {...register("itemType", { required: "Item type is required" })}
          />
          {errors.itemType && <p className="error">{errors.itemType.message}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Item Description</label>
          <textarea
            className="input-field"
            placeholder=" "
            {...register("itemDescription", { required: "Description is required" })}
          />
          {errors.itemDescription && <p className="error">{errors.itemDescription.message}</p>}
        </div>

        {/* Cover Image */}
        <div className="form-group">
          <label>Cover Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("coverImage", { required: "Cover image is required" })}
            onChange={(e) => setCoverName(e.target.files[0]?.name || "")}
          />
          {coverName && <p className="filename-display">{coverName}</p>}
          {errors.coverImage && <p className="error">{errors.coverImage.message}</p>}
        </div>

        {/* Additional Images */}
        <div className="form-group">
          <label>Additional Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register("additionalImages")}
            onChange={(e) =>
              setAdditionalNames(Array.from(e.target.files).map(file => file.name))
            }
          />
          {additionalNames.length > 0 && (
            <ul className="filename-display">
              {additionalNames.map((name, idx) => <li key={idx}>{name}</li>)}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Item"}
        </motion.button>

        {/* Success Message */}
        {successMsg && <div className="success-msg">{successMsg}</div>}
      </form>
    </motion.div>
  );
};

export default AddItem;
