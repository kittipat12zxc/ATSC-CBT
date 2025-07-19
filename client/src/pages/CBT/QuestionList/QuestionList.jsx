import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";


import ConfirmSend from '../../components/ConfirmSend/ConfirmSend';

// ฟังค์ชันสุ่มข้อ
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];   
  }
  return array;
}

// ฟังค์ชันสุ่มช็อย
function shuffleChoices(question) {
    if (!question || !question.is_correct) return question;

    // set choires
    const choices = [
        { label: "Choices1", value: question.choices_one },
        { label: "Choices2", value: question.choices_two },
        { label: "Choices3", value: question.choices_three },
        { label: "Choices4", value: question.choices_four },
        { label: "Choices5", value: question.choices_five }
    ];

    const shuffled = choices.sort(() => Math.random() - 0.5);// แรนดอมช็อย

    return {
        ...question,
        ShuffledChoices: shuffled
    };
}


function QuestionForm() {
    const [answersMCQ, setAnswersMCQ] = useState({});
    const [answersEssay, setEssayAnswers] = useState({})
    const [errors, setErrors] = useState({});
    const [shuffledQuestionsChonies, setShuffledQuestionsChonies] = useState([]);// เก็บข้อมูบที่ถูกสุ่มข้อช็อยทั้งหมดแล้ว
    const [shuffledQuestionsWrite, setShuffledQuestionsWrite] = useState([]);// เก็บข้อมูบที่ถูกสุ่มข้อเขียนทั้งหมดแล้ว
    const [timeLeft, setTimeLeft] = useState(null); // ⏰ เริ่มนับ
    const [showPopup, setShowPopup] = useState(false); // ใช้ในการแสดงป็อปอัป
    const [questions, setQuestions] = useState([]);// เก็บข้อมูลคำถามทั้งช็อยและเขียนที่ได้มาจาก questionlist
    const [examInfo, setExamInfo] = useState(null);// เก็บข้อมูลชุดข้อสอบและผู้สอบที่ได้มาจาก questionlist
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [switchChonies, setSwitchChonies] = useState(false);// เช้คว่ามีข้อช็อยไหม
    const [switchWrite, setSwitchWrite] = useState(false);// เช็คว่ามีข้อเขียนไหม

    // const ExaminationID = sessionStorage.getItem("ExaminationID");
    // const ExamineeID = sessionStorage.getItem("ExamineeID");
    // const ExaminationName = sessionStorage.getItem("ExaminationName");
    // const Total = sessionStorage.getItem("Total");

    const ExaminationID = 686001
    const ExamineeID = 6611005
    const ExaminationName = "ความรู้พื้นฐานด้านคอมพิวเตอร์"
    const Total = 100
    


    const navigate = useNavigate();

    const now = new Date();
    const startTime = useMemo(() => {
        return examInfo ? new Date(examInfo.start_datetime) : null;
    }, [examInfo]);
    // ตรวจสอบว่า questions มีข้อมูลหรือไม่
    const EndTime = useMemo(() => {
        if (!examInfo) return null;
        const TimeOut = examInfo.duration_minutes;
        if (typeof TimeOut !== 'string' || !TimeOut.includes(':')) return null;

        const [hours, minutes, seconds] = TimeOut.split(":").map(Number);
        if ([hours, minutes, seconds].some(isNaN)) return null;

        const addedMs = (hours * 60 * 60 + minutes * 60 + seconds) * 1000; // คำนวณเป็น milliseconds
        return new Date(startTime.getTime() + addedMs);
    }, [examInfo, startTime]);

    const TimeStart = now.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // ถ้าอยากได้ 24 ชั่วโมง (เอาออกถ้าอยากได้แบบ AM/PM)
      });

    // ดึงข้อมูลคำถามจาก API
    useEffect(() => {
        fetch('http://localhost:5000/api/cbt/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ExamineeID, ExaminationID }),
        })
        .then(response => response.json())
        .then(data => {
            const shuffled = data.questions.map(q => {
                if (q.question_type === 'mcq') {
                    return shuffleChoices(q);
                }
                return q;
            }); // ✅ สุ่มช็อยทุกข้อ
            const examinfo = data.examInfo
            console.log('Examinfo', examinfo)
            setExamInfo(examinfo)
            console.log("Fetched and shuffled questions:", shuffled);
            setQuestions(shuffled);
        })
        .catch(error => console.error('Error fetching questions:', error));
    }, [ExamineeID, ExaminationID]);

    const Confirmsend = (e) => {
        e.preventDefault();
        setShowConfirmPopup(true);
    }

    // 🎯 handleSubmit (ห่อด้วย useCallback เพื่อหลีกเลี่ยงการสร้างใหม่ทุกครั้งที่ re-render)
    const handleSubmit = useCallback((event) => {
        if (event) event.preventDefault();

        let newErrors = {};

        // ตรวจ MCQ
        shuffledQuestionsChonies.forEach((_, index) => {
            if (!answersMCQ[index]) {
                newErrors[`mcq-${index}`] = "⚠ กรุณาเลือกคำตอบ";
            }
        });

        // ตรวจ Essay
        shuffledQuestionsWrite.forEach((_, index) => {
            if (!answersEssay[index]) {
                newErrors[`essay-${index}`] = "⚠ กรุณากรอกคำตอบ";
            }
        });
        
        // เลื่อน scroll ไปยังข้อที่ไม่ได้กรอก
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            const firstUnansweredKey = Object.keys(newErrors)[0]; // เช่น "mcq-1" หรือ "essay-2"
            const [type, index] = firstUnansweredKey.split("-"); // แยกประเภท กับ index
            const domId = type === "mcq" ? `question-${index}` : `essay-${index}`;
            const target = document.getElementById(domId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }

            return;
        }

        // คำนวณคำตอบที่ถูกต้อง
        let accuracy = 0;
        shuffledQuestionsChonies.forEach((question, index) => {
            if (answersMCQ[index] === question.is_correct.trim()) {
                accuracy += 1;
            }
        });

        // ✅ อัปเดต Status เป็น Done
        try {
            fetch("http://localhost:5000/updateExam", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ExamineeID, accuracy, answersMCQ, answersEssay, shuffledQuestionsChonies, ExaminationID, shuffledQuestionsWrite}), // ใช้ ID ที่ได้จาก sessionStorage
            });
        } catch (err) {
            console.error("อัปเดตไม่สำเร็จ", err);
        }

        
        //const ExaminationName = questions[0].ExaminationName
        console.log("AnswerMCQ:", answersMCQ);
        console.log("Answerssay:", answersEssay);
        console.log("shuffledQuestions:",shuffledQuestionsChonies);
        navigate("/end", { state: {ExaminationName} });
    }, [answersMCQ, answersEssay, shuffledQuestionsChonies, shuffledQuestionsWrite, navigate, ExamineeID, ExaminationName, Total, ExaminationID]);

    // ⏳ นับถอยหลังเวลา
    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = new Date();
            const remaining = Math.floor((EndTime - currentTime) / 1000); // เหลือกี่วินาที

                if (remaining <= 0) {
                    clearInterval(timer); // หยุดนับถอยหลังเมื่อหมดเวลา
                    setTimeLeft(0);
                    setShowPopup(true); // แสดงป็อปอัปเมื่อหมดเวลา
                    handleSubmit(); // หมดเวลา → ส่งคำตอบ
                    return 0;
                } else {
                    setTimeLeft(remaining)
                }
        }, 1000);

        return () => clearInterval(timer); // Cleanup เมื่อ component ถูกลบ
    }, [EndTime,handleSubmit]);

    // 🎲 สุ่มคำถาม
    useEffect(() => {
        console.log("✅ questions received:", questions);

        // แยก MCQ กับ Essay
        const mcqQuestions = questions.filter(q => q.question_type === 'mcq');
        const essayQuestions = questions.filter(q => q.question_type === 'essay');

        // สุ่มแยกแต่ละประเภท
        const shuffledMCQ = shuffleArray(mcqQuestions);
        const shuffledEssay = shuffleArray(essayQuestions);
        console.log("MCQ", shuffledMCQ);
        console.log("ESSAY", shuffledEssay);

        if(shuffledMCQ.length > 0) {
            setSwitchChonies(true);
        }

        if(shuffledEssay.length > 0) {
            setSwitchWrite(true);
        }

        setShuffledQuestionsChonies(shuffledMCQ);
        setShuffledQuestionsWrite(shuffledEssay);
    }, [questions]);

    // บันทึกคำตอบช็อย
    const handleMCQAnswerChange = (questionIndex, choice) => {
        setAnswersMCQ(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: choice.trim()
        }));
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[`mcq-${questionIndex}`];
            return newErrors;
        });
    };

    // บันทึกคำตอบข้อเขียน
    const handleEssayAnswerChange = (questionIndex, text) => {
        setEssayAnswers(prev => ({
            ...prev,
            [questionIndex]: text.trim()
        }));

        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[`essay-${questionIndex}`];
            return newErrors;
        });
    };

    // ฟังก์ชันปิดป็อปอัปและไปหน้า EndofExam
    const closePopup = () => {
        setShowPopup(false); // ซ่อนป็อปอัป
        navigate("/end"); // ไปหน้า EndofExam และให้คะแนนเป็น 0
    };

    return (
    <div>
      <div className="bg-white rounded-lg shadow-md w-[90%] max-w-[1400px] p-4 my-5 mx-auto border border-gray-300">
        <h1>{ExaminationName}</h1>
        <p className="mt-5">คำชี้แจ้ง:</p>
        {examInfo && (
          <>
            <p>{examInfo.details}</p>
            <p className="mt-10">ผู้เข้าสอบ:</p>
            <div className="flex mx-auto">
              <p className="px-1">{examInfo.firstName}</p>
              <p className="px-1 pr-16">{examInfo.lastName}</p>
              <p className="pr-16">รหัส: {ExamineeID}</p>
              <p>เริ่มทำตอน: {TimeStart} น.</p>
            </div>
          </>
        )}
      </div>

      <form onSubmit={Confirmsend}>
        {switchChonies ? (
          switchWrite ? (
            <>
              <div className="bg-white rounded-lg shadow-md w-[90%] max-w-[1400px] p-4 my-5 mx-auto border border-gray-300">
                <p className="block">ตอนที่ 1: ปรนัย </p>
              </div>
              <div className="bg-white rounded-lg shadow-md w-[90%] max-w-[1400px] p-4 my-5 mx-auto border border-gray-300">
                {shuffledQuestionsChonies.map((questions, index) => (
                  <div
                    key={index}
                    id={`question-${index}`}
                    className={`block pb-5 pl-5 mb-2 mt-2 ${errors[`mcq-${index}`] ? 'border-2 border-red-600' : ''}`}
                  >
                    <p className="py-5 text-lg font-semibold">
                      {index + 1}. {questions.questions_text}
                    </p>
                    {typeof questions.image_url === 'string' &&
                      questions.image_url.startsWith('data:image/') &&
                      questions.image_url.split(',')[1]?.trim() !== '' && (
                        <div className="flex min-w-full">
                          <img src={questions.image_url} alt={`รูปภาพ${index}`} className="w-1/2 h-1/2 ml-[5%] mb-5" />
                        </div>
                      )}
                    <div className="ml-4">
                      {questions.ShuffledChoices?.filter(choice => choice.value).map((choice, choiceIndex) => (
                        <label key={choiceIndex} className="text-lg block py-2">
                          <input
                            type="radio"
                            name={`question-mcq-${index}`}
                            value={choice.value}
                            checked={answersMCQ[index] === choice.value}
                            onChange={() => handleMCQAnswerChange(index, choice.value)}
                            className="scale-[1.8] mr-3"
                          />
                          {choice.value}
                        </label>
                      ))}
                    </div>
                    {errors[`mcq-${index}`] && <p className="text-red-600 font-bold">{errors[`mcq-${index}`]}</p>}
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg shadow-md w-[90%] max-w-[1400px] p-4 my-5 mx-auto border border-gray-300">
                <p className="block">ตอนที่ 2: อัตนัย </p>
              </div>
              <div className="bg-white rounded-lg shadow-md w-[90%] max-w-[1400px] p-4 my-5 mx-auto border border-gray-300">
                {shuffledQuestionsWrite.map((question, index) => {
                  const questionNumber = shuffledQuestionsChonies.length + index + 1;
                  return (
                    <div key={index} id={`essay-${index}`} className="block pb-5 pl-5 mb-2 mt-2">
                      <p className="py-5 text-lg font-semibold">
                        {questionNumber}. {question.questions_text}
                      </p>
                      {typeof question.image_url === 'string' &&
                        question.image_url.startsWith('data:image/') &&
                        question.image_url.split(',')[1]?.trim() !== '' && (
                          <div className="flex min-w-full">
                            <img src={question.image_url} alt={`รูปภาพ${index}`} className="w-1/2 h-1/2 ml-[5%] mb-5" />
                          </div>
                        )}
                      <textarea
                        className="inline-block w-[50vw] border border-black rounded ml-6 text-lg"
                        name={`question-essay-${questionNumber}`}
                        value={answersEssay[index] || ''}
                        onChange={(e) => handleEssayAnswerChange(index, e.target.value)}
                      />
                      {errors[`essay-${index}`] && <p className="text-red-600 font-bold">{errors[`essay-${index}`]}</p>}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            // Similar structure for only choice questions (skip for brevity)
            <></>
          )
        ) : (
          // Only essay questions rendering (skip for brevity)
          <></>
        )}

        <div className="py-3 px-5 w-full text-center">
          <button
            type="submit"
            className="w-1/2 bg-green-600 text-white py-3 px-6 rounded-lg text-lg hover:opacity-80"
          >
            ส่งคำตอบ
          </button>
        </div>
      </form>

      <div className="fixed bottom-5 right-5 bg-red-500 text-white px-5 py-3 rounded-lg text-lg font-bold z-[1000]">
        เวลาที่เหลือ {String(Math.floor(timeLeft / 3600)).padStart(2, '0')}:
        {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0')}:
        {String(timeLeft % 60).padStart(2, '0')} ชั่วโมง
      </div>

      {showPopup && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white px-10 py-8 rounded-lg text-lg font-bold z-[1000] w-[300px] text-center">
          <p className="text-[#FF5733]">หมดเวลาทำข้อสอบแล้ว!</p>
          <button
            className="bg-red-600 text-white py-2 px-8 rounded mt-5 hover:bg-red-800"
            onClick={closePopup}
          >
            ตกลง
          </button>
        </div>
      )}

      {showConfirmPopup && (
        <ConfirmSend
          handleSubmit={() => {
            setShowConfirmPopup(false);
            handleSubmit();
          }}
          onClose={() => setShowConfirmPopup(false)}
        />
      )}
    </div>
  );
};

export default QuestionForm;