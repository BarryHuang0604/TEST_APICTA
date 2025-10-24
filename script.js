const DEVICE_ID = "1e9fa746-cc14-4e56-ade9-2c38f825e091";
const PROPERTY_ID = "cec2596e-336c-4579-9514-f1877ce82cc5";
const TOKEN = ""; // 保留空白，不要填

async function fetchData() {
  const dataValue = document.getElementById("dataValue");

  if (!TOKEN) {
    dataValue.textContent = "⚠️ 尚未設定 Token（目前是安全模式）";
    return;
  }

  try {
    const response = await fetch(
      `https://api2.arduino.cc/iot/v2/devices/${DEVICE_ID}/properties/${PROPERTY_ID}`,
      {
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) throw new Error("無法取得資料");

    const data = await response.json();
    dataValue.textContent = data.last_value ?? "無資料";
  } catch (err) {
    dataValue.textContent = "❌ 錯誤：" + err.message;
  }
}

setInterval(fetchData, 5000);
fetchData();
