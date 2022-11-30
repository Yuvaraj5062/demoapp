export async function base64(file) {
    // check
    const reader = new FileReader();
    let photo;
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      photo = e.currentTarget.result;
      return photo;
    };
  
    
  }