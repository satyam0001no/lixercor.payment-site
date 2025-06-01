
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const validUTRs = [
  "123456789012",
  "987654321098",
  "456789123456"
];

app.post("/verify-utr", (req, res) => {
  const { utr } = req.body;

  if (!utr) {
    return res.status(400).json({ success: false, message: "UTR missing" });
  }

  if (validUTRs.includes(utr.trim())) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false, message: "UTR not found or not paid" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
