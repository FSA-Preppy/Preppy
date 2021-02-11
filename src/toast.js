import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const notifyAddFridge = () => {
  toast.success(`👨‍🍳  Successfully added to your Fridge`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyAdd = () => {
  toast.success(`👨‍🍳  Successfully added to the board`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyRemove = () => {
  toast.error(`👨‍🍳  Removed from the board!`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const notifyDuplicate = () => {
  toast.error(`🤪 Item already exists in your Fridge`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyBarcodeError = () => {
  toast.error(`😅 Barcode was not recognized, Please try again`, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyDelete = () => {
  toast.error(`👨‍🍳  Successfully deleted from Fridge!`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyFetchError = () => {
  toast.error(`Unable to fetch recipes. Please try again`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const notifyRecipeError = () => {
  toast.error("😅 No recipes are found. Please use other ingredients", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyImgError = () => {
  toast.error("😅 Image was not recognized. Please try again", {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
