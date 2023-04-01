export const useUtils = () => {
  const useTitle = (str: string) => {
    return (
      str.charAt(0).toUpperCase() +
      str.substring(1, str.length).replace("_", " ")
    );
  };

  const usePhotoExtValidation = (e: any) => {
    const file = e.target.files[0];
    const ext = file.name.substring(file.name.lastIndexOf(".") + 1);

    const reader: any = new FileReader();
    reader.readAsDataURL(file);

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

    if (!allowedExtensions.includes(ext)) {
      reader.extError = true;
      reader.extErrorMessage = "Invalid file extension";
    }

    reader.ext = ext;

    return { reader };
  };

  return { useTitle, usePhotoExtValidation };
};
