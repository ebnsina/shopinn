import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import axios from "axios";

function FileUpload({ values, setValues, loading, setLoading }) {
  async function handleFileUpload(e) {
    const files = e.target.files;
    const allUploadedFiles = values.images;

    if (files) {
      setLoading(true);

      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/uploadImage`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("Image uploaded successfully.", res.data);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  }

  async function handleImageRemove(public_id) {
    setLoading(false);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/removeImage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImage = images.filter(
          (item) => item.public_id !== public_id
        );

        setValues({ ...values, images: filteredImage });
      })
      .catch((err) => console.log(err));
  }

  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div>
      <div className="flex space-x-6">
        {loading ? (
          <p className="text-center text-red-500 text-sm font-sembold my-2">
            Uploading images...
          </p>
        ) : (
          values.images.map((image) => (
            <div
              key={image.public_id}
              className="relative border border-gray-200 mb-2 rounded-lg"
            >
              <button
                onClick={() => handleImageRemove(image.public_id)}
                type="button"
                className="w-8 h-8 bg-white absolute -top-2 right-0 border border-gray-200 px-2 py-1 text-base rounded-full"
              >
                &times;
              </button>
              <img className="w-16 h-16 object-cover" src={image.url} alt="" />
            </div>
          ))
        )}
      </div>
      <label
        htmlFor="image"
        className="block px-4 py-2 mb-4 rounded-lg border border-gray-200 focus:outline-none w-full focus:border-gray-300"
      >
        <input
          id="image"
          type="file"
          multiple
          accept="images/*"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}

export default FileUpload;
