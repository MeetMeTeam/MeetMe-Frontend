import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Config";
import * as api from "../../api";
import Loading from "../../shared/components/Loading";
function AdminPage() {
  const inputList = [
    { name: "ชื่อ avatar", type: "text", dataFor: "name" },
    { name: "ราคา", type: "number", dataFor: "price" },
    { name: "ประเภท", type: "text", dataFor: "type" },
  ];
  const [avatarList, setAvatarList] = useState([]);
  const [images, setImages] = useState([]);
  let imageList = [];
  const [errorText, setErrorText] = useState("");
  const [isShowInput, setIsShowInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    price: 0,
    type: "",
  });

  async function submitForm() {
    if (
      Object.values(credentials).every(
        (value) => value !== undefined && value !== "" && images.length > 0
      )
    ) {
      setIsLoading(true);
      await uploadFiles();
      console.log(imageList);
      const data = {
        name: credentials.name,
        price: Number(credentials.price),
        assets: imageList,
        preview: imageList[0],
        type: credentials.type,
      };
      const response = await api.addAvatarShop(data);
      if (response.status === 200) {
        console.log("add สำเร็จ");
        setIsShowInput(false);
        setTimeout(() => {
          setIsShowInput(true);
        }, 100);
        setCredentials({
          name: "",
          price: 0,
        });
        setImages("");
        setErrorText("");
        setIsLoading(false);
        getAvatarAll();
      } else {
        setErrorText(response.exception.response.data.message);
        setIsLoading(false);
      }
    } else {
      setErrorText("กรุณากรอกข้อมูลให้ครบ");
    }
  }

  const uploadFiles = async () => {
    let urlList = [];
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `/avatar/test/${images[i].name}`);

      const result = await uploadBytes(imageRef, images[i]);

      const downloadURL = await getDownloadURL(imageRef);

      console.log("File URL:", downloadURL);
      imageList.push(downloadURL);
    }
    console.log(imageList);
    // imageList =  urlList
  };

  async function getAvatarAll() {
    const response = await api.getAvatarShop();
    if (response.status === 200) {
      setAvatarList(response.data.data);
    }
  }
  useEffect(() => {
    getAvatarAll();
  }, []);

  return (
    <div className="flex flex-col gap-10 p-6 justify-center items-center h-screen">
      <div className="bg-blue-90 p-4 rounded-lg">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="font-bold text-[18px] mb-4">เพิ่มตัวละคร</div>
            <div className="flex flex-col space-y-2">
              {" "}
              {inputList.map((item, index) => (
                <div key={index}>
                  <div className="flex flex-col max-w-[400px]">
                    <span className="label-text">{item.name}</span>

                    <input
                      value={credentials[item.dataFor]}
                      onChange={(e) => {
                        setCredentials({
                          ...credentials,
                          [item.dataFor]: e.target.value,
                        });
                      }}
                      type={item.type}
                      className="rounded-lg p-1"
                    />
                  </div>
                </div>
              ))}{" "}
            </div>
            <div className="mt-2 mb-2">รูปตัวละคร</div>
            {isShowInput && (
              <input
                type="file"
                multiple
                className="bg-white rounded-lg "
                onChange={(event) => {
                  setImages(event.target.files);
                }}
              />
            )}

            <div className="text-red-600 mt-2">{errorText}</div>
            <button
              onClick={submitForm}
              className="bg-blue-600 rounded-lg text-white mr-2 mt-4 py-2 px-2"
            >
              add avatar
            </button>
          </div>
        )}
      </div>
      <div>
        ตัวละครทั้งหมด
        <div className="flex flex-wrap gap-4">
          {avatarList.length > 0 ? (
            avatarList.map((item) => (
              <img
                src={item.preview}
                alt={item.preview}
                className="w-[100px] h-[100px] object-contain bg-white p-4 rounded-lg"
              />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
