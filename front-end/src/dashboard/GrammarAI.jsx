import React, { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const GrammarAI = () => {
  const { apiUrl } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const { grammarInput, setGrammarInput, grammarOutput, setGrammarOutput } = useContext(StoreContext);
  
  const handleCheck = async () => {

    if (!grammarInput.trim())
      return setGrammarOutput("Vui lòng nhập đoạn văn cần kiểm tra!");

    setLoading(true);
    setGrammarOutput("");

    try {
      const res = await fetch(`${apiUrl}/api/grammarcheck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: grammarInput }),
      });

      const data = await res.json();
      if (data.success) setGrammarOutput(data.correction);
      else alert(data.message || "Lỗi từ server");
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">AI sửa ngữ pháp</h2>
      <textarea
        value={grammarInput}
        onChange={(e) => setGrammarInput(e.target.value)}
        className="w-full border rounded p-2 h-44"
        placeholder="Nhập văn bản ở đây..."
      />
      <div className="mt-3">
        <button
          onClick={handleCheck}
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          {loading ? "Đang kiểm tra..." : "Kiểm tra"}
        </button>
      </div>
      {grammarOutput && (
        <div className="mt-4 border-t pt-3">
          <h3 className="font-semibold">Kết quả</h3>
          <p className="whitespace-pre-line mt-2 ">{grammarOutput}</p>
        </div>
      )}
    </div>
  );
};

export default GrammarAI;
