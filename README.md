# 🩺 MedBot – Simulador de Paciente

O **MedBot** é um simulador de pacientes com sintomas clínicos comuns, voltado para auxiliar médicos iniciantes na prática de diagnósticos. A aplicação utiliza uma interface web interativa, com um backend em FastAPI integrado à API do Gemini (Google) para geração de respostas realistas baseadas em linguagem natural.

## 🚀 Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Python + FastAPI
- **API de IA:** Gemini (Google Generative Language API)

## 📦 Requisitos

Antes de rodar o projeto, verifique se você tem instalado:

- Python 3.10+
- Navegador web moderno
- Biblioteca `requests`
- Biblioteca `python-dotenv`

## ⚙️ Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/medbot-simulador.git
cd medbot-simulador
```

### 2. Instale as dependências Python

pip install fastapi requests python-dotenv uvicorn

### 3. Configure a chave API

Em main.py, cole sua chave GEMINI API (linha 9).

### 4. Execute o Servidor

uvicorn main:app --reload
(certifique-se de estar no diretório correto, para executar o servidor)

### 5.Tudo Pronto!

Execute o Frontend (index.html)!
