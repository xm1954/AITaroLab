# AI타로 리딩 웹 애플리케이션 🎴✨

![스크린샷 2024-12-24 180039](https://github.com/user-attachments/assets/fe75a70c-49b9-4565-bb58-a868923f1e92) 
> **운명과 통찰을 탐구할 수 있는 현대적이고 직관적인 타로 리딩 웹 애플리케이션**

---

## 목차
1. [프로젝트 소개](#프로젝트-소개)
2. [주요 기능](#주요-기능)
3. [기술 스택](#기술-스택)
4. [설치 방법](#설치-방법)
5. [기능 미리보기](#기능-미리보기)
6. [문의](#문의)

---

## 프로젝트 소개

AI를 이용한 타로 뽑기
ChatGPT 4.0을 기반으로 삶의 질문에 대한 통찰을 얻을 수 있도록 설계된 **타로 리딩 웹 애플리케이션**입니다.  
누구나 쉽고 직관적인 UI를 통해 누구나 쉽게 타로 리딩을 경험할 수 있습니다.

---

## 주요 기능

- 🔮 **카드 선택**: 사용자가 다양한 타로 카드를 선택할 수 있습니다.
- 📜 **카드 해석**: 선택한 카드에 대한 상세한 해석 제공.
- 🛠️ **회원 관리**: 로그인 및 회원 전용 리딩 기능.
- ⚙️ **API 연동**: OpenAI를 활용한 추가적인 상담 제공 (예: GPT 기반 해석).
- 🌐 **반응형 디자인**: PC와 모바일에서 모두 최적화된 사용자 경험 제공.

---

## 기술 스택

- **백엔드**: Spring Boot, Hibernate, MySQL
- **프론트엔드**: React.js, HTML/CSS, JavaScrip
- **API**: GPT API
- **보안**: Spring Security, JWT
---

## 설치 방법

### 요구 사항
- **Java 21 이상**
- **Node.js 22 이상**
- **MySQL 8.0**

### 설치 단계
1. **백엔드 클론 및 설정**
   ```bash
   git clone https://github.com/your-repository/tarot-backend.git
   cd tarot-backend
   ./mvnw clean install

2. **프론트엔드 클론 및 설정**
   ```bash
    git clone https://github.com/your-repository/tarot-frontend.git
    cd tarot-frontend
    npm install
    npm start

4. **애플리케이션 실행**
    ```bash
    백엔드: mvn spring-boot:run
    프론트엔드: npm start
   
---
## 기능 미리보기

### 1. 회원가입 및 로그인 🔑
- 회원가입 후 로그인하여 타로 리딩 서비스를 이용할 수 있습니다.
![회원가입 스크린샷](https://github.com/user-attachments/assets/5ee69707-ed9a-4e7b-8c45-e9414cad891f)
![로그인 스크린샷](https://github.com/user-attachments/assets/c034ee07-a0aa-4323-a820-1a3d3d50940d)

---

### 2. 질문 입력 ✍️
- **Question.js**에서 사용자가 질문을 입력하면, 질문이 **Card.js**로 전달됩니다.
![질문 입력 스크린샷](https://github.com/user-attachments/assets/d9aa405e-be62-424f-b754-1e750cb065ea)

---

### 3. 카드 선택 및 서버 전송 🎴
- 사용자가 선택한 카드와 질문은 서버로 전송되며, 서버는 이를 처리합니다.
- **Payload**에는 선택된 카드 ID와 질문이 포함되며, 서버에서는 이를 **`@RequestBody`**로 수신합니다.
![카드 선택 스크린샷](https://github.com/user-attachments/assets/24a8da5a-b834-493c-acd2-b409191813bb)

---

### 4. 리딩 결과 확인 🔍
- `/api/tarot/select` 엔드포인트를 호출하여 결과를 서버로부터 받아옵니다.
- 결과는 **`api/tarot/results/${resultId}`**를 통해 사용자에게 표시됩니다.
![결과 확인 스크린샷 1](https://github.com/user-attachments/assets/89e7946b-70cd-4079-95f4-c66a421c7b39)


![결과 확인 스크린샷 2](https://github.com/user-attachments/assets/0dd3a1fc-7702-4ba0-86fb-4765e7004fbb)

---

### 5. 마이 페이지 👤
- 사용자는 자신의 타로 리딩 결과를 마이 페이지에서 확인할 수 있습니다.
![마이 페이지 스크린샷](https://github.com/user-attachments/assets/12ddf809-17f4-444c-8ddd-026c340cb572)

---

### 6. 문의하기 💬
- 사용자는 플랫폼을 통해 문의를 작성하고 제출할 수 있습니다.
![문의하기 스크린샷](https://github.com/user-attachments/assets/786ea022-3343-44d1-a0e5-49438097f1c9)

---

### 7. 어드민 페이지 🛠️
- 관리자 계정으로 접근하여 사용자 관리와 문의 확인 및 답변 작성이 가능합니다.
  - **계정 관리**: 계정 정지, 닉네임 변경 가능.
  - **문의 관리**: 사용자 문의 확인 및 답변 작성.
![어드민 페이지 스크린샷 1](https://github.com/user-attachments/assets/ce458802-0f0c-45e2-a514-e694a3fd1218)
![어드민 페이지 스크린샷 2](https://github.com/user-attachments/assets/f40ba7ca-ed2b-4fd1-8964-d28803050bee)

---

## 문의

문의 이메일 : xm1954@naver.com


