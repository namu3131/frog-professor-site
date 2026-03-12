export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = req.body;

  console.log("문의 데이터:", data);

  res.status(200).json({
    message: "문의가 정상적으로 접수되었습니다."
  });

}
