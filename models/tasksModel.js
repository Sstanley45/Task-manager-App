import mongoose from "mongoose";

const TasksSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please insert a task to proceed"],
      maxLength: [70, 'text should not exceed 70 characters'],  
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TasksSchema);
