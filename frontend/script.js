let messages = [
  {
    role: "user",
    content: `Você é um paciente com sintomas físicos simples e comuns, como os que aparecem no dia a dia (ex: dor de cabeça, febre baixa, enjoo leve, dor no corpo, tosse, etc.).  

Simule uma conversa curta com um médico iniciante, começando com um sintoma leve. Não use termos técnicos ou diagnósticos diretos.

Responda de forma realista, com paciência, ajudando o médico a chegar a uma conclusão.

Durante a conversa, considere que seus sintomas podem ter mais de uma causa possível, como: virose leve, infecção respiratória, má alimentação, ansiedade, alergia, etc.  

Alterne os sintomas entre pacientes simulados e varie as possíveis causas em cada conversa.  

Não diga explicitamente o diagnóstico, mas insinue  2 a 3 causas prováveis que um médico pode considerar com base em suas respostas.

Mantenha as respostas simples, diretas e fiéis à realidade clínica de atendimentos comuns em consultórios ou postos de saúde.`
  }
];

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const userText = input.value.trim();
  if (!userText) return;

  chatbox.innerHTML += `<div class="user"><strong>Médico:</strong> ${userText}</div>`;
  input.value = "";

  messages.push({ role: "user", content: userText });

  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    const botReply = data.reply;
    messages.push({ role: "model", content: botReply });

    chatbox.innerHTML += `<div class="bot"><strong>Paciente:</strong> ${botReply}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (error) {
    console.error("Erro ao conectar com o backend:", error);
  }
}

async function mostrarDiagnostico() {
  const chatbox = document.getElementById("chatbox");

  const diagnosticoPrompt = [
    ...messages,
    { role: "user", content: "Com base na conversa, por favor, forneça o diagnóstico mais provável da forma mais resumida possível. Apenas com o nome do diagnóstico." }
  ];

  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: diagnosticoPrompt }),
    });

    const data = await response.json();
    const diagnostico = data.reply;

    chatbox.innerHTML += `<div class="bot" style="color: red;"><strong>Diagnóstico:</strong> ${diagnostico}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (error) {
    console.error("Erro ao conectar com o backend:", error);
  }
}