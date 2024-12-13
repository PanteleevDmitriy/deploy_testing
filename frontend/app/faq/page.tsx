export default function FAQ() {
    const faqs = [
      { question: "Вопрос 1", answer: "Ответ 1" },
      { question: "Вопрос 2", answer: "Ответ 2" },
      { question: "Вопрос 3", answer: "Ответ 3" },
    ]
  
    return (
      <div className="container mx-auto px-4 py-16 pt-24">
        <h1 className="text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  