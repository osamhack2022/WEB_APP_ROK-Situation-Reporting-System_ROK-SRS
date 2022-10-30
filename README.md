# 국군 야전 상황보고체계, ROK Situation Reporting System

![Logo](https://i.ibb.co/PmQxT82/450-300px-300-100px-900-300px.png)

<p align="center">
	<a href="https://github.com/osamhack2022/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS/graphs/contributors/"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/osamhack2022/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS?color=success"></a>
	<a href="https://github.com/osamhack2022/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS/blob/main/license.md"><img alt="GitHub license" src="https://img.shields.io/github/license/osamhack2022/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS"></a>
	<a href="https://github.com/osamhack2022/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS/issues"><img alt="GitHub Issues" src="https://img.shields.io/github/issues/osamhack2022/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS"></a>
	<a href="https://github.com/osamhack2022/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS/issues"><img alt="GitHub Issues Vlosed" src="https://img.shields.io/github/issues-closed/osamhack2022/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS"></a>

</p>
<br/>

<div align="center">
<a href="https://nine-collision-c7a.notion.site/c239b0b1de354ef4940fe0c56ec40e02"><img height="45px" src="./.docs/images/개발_계획서.png" alt="개발 계획서"/></a>&nbsp;&nbsp;<a href="https://rok-mabigmk4h-s3kim2018.vercel.app/"><img height="45px" src="./.docs/images/데모보기.png" alt="데모보기"/></a>&nbsp;&nbsp;<a href="https://github.com/osamhack2022-v2/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS/wiki/%EC%95%94%ED%98%B8%ED%99%94-%EC%B2%B4%EA%B3%84"><img height="45px" src="./.docs/images/암호화_체계.png" alt="암호화 체계"/></a>
</div>

<br/>
<div align="center">
<h2>데모영상 시청</h2>
<a href="https://www.youtube.com/watch?v=4J2cPialaMY"><img alt="demo video" src="https://i.ibb.co/K2VFFtH/Blank-board-Page-1-1.png" width=700px></a>

</div>

<br/>

<ol>
    <li><a href="#introduction">프로젝트 소개</a></li>
    <ol>
        <li>
            <a href="#problem">문재점</a>
        </li>
        <li>
            <a href="#solution">국군 야전 상황보고체계의 해결책</a>
        </li>
                <li>
            <a href="#market">목표 시장</a>
        </li>
    </ol>
    <li><a href="#features">기능 설명</a></li>
 	<ol>
        <li>
            <a href="#encryption">강력한 암호화</a>
        </li>
        <li>
            <a href="#ai">AI를 통한 심각성/중요도 점수</a>
        </li>
                <li>
            <a href="#functions">화면 설계</a>
        </li>
    </ol>
	<li><a href="#requirements">컴퓨터 구성 / 필수 조건 안내 (Prerequisites)</a></li>
	<li><a href="#techniques">기술 스택 (Technique Used)</a></li>
	<li><a href="#installation">설치 안내 (Installation Process)</a></li>
	<ol>
        <li>
            <a href="#backendinstall">Backend 설치안내</a>
        </li>
        <li>
            <a href="#frontendinstall">Frontend(Web) 설치안내</a>
        </li>
        <li>
            <a href="#appinstall">APP 설치안내</a>
        </li>
    </ol>
	<li><a href="#team">팀 정보 (Team Information)</a></li>
	<li><a href="#documentation"> 문서 (Documentation)</a></li>
	<li><a href="#copyright">저작권 및 사용권 정보 (Copyleft / End User License)</a></li>
</ol>

<a id = "introduction"></a>

## 📢 프로젝트 소개

<a id = "problem"></a>

**🚩 문제점**

> "7생활관 전원 코로나 걸렸대, 대대장님께 카톡으로 보고드려."

> "오늘 훈련한 거 사진 찍어서 대대 단톡방에 올려."

> "후임이 다쳤는데 군 전화도 주변에 없네… 어떻게 보고를 하지?"

> "밥이 너무 맛이 없는데 건의를 어떻게 하지? 연대장님께 전화해볼까?"

대대급 부대 내부에서 용사와 간부 또는 간부 대 간부 간 이용할 효율적이고 안전한 보고체계가 없습니다.

- 기존의 온나라 체계를 이용한다 하더라도 국방망에 접속이 불가능한 영외 간부에 대한 호출 및 긴급정비와 같은 상황일 경우, 전파에 어려움이 있어 전화/카카오톡과 같은 서비스를 이용하는 것이 현실입니다. 더불어 용사는 해당 체계 계정조차 생성할 수 없다는 것이 뚜렷한 한계점입니다.
- 부대 내부의 정보는 아무리 사소하더라도 군사기밀입니다. 민간 상용 애플리케이션을 이용하는 것은 사이버 보안에 위배되는 행위이고, 기밀 사항을 실수로 다른 사람에게 전달할 수 있는 위험성이 존재하며, 타사 애플리케이션이 해킹당하면 저장된 자료가 암호화되어있다는 보장도 없습니다. 또한, 사회공학으로 군사기밀이 유출될 위험도 있습니다.
- 보안성에 문제가 있을 뿐만 아니라, 군에서 원칙적으로 이행되어야 하는 보고체계를 준수하지 않고 보고하는 상황도 많이 발생합니다.
- 이런 문제점들은 군대라는 조직에서 통제능력 상실과, 상황조치에 큰 차질을 초래할 것입니다.

<a id = "solution"></a>

**💡 국군 야전 상황보고체계의 해결책**

- 부대 내의 모든 전파사항은 암호문 비구별성 원칙(IND-CPA)에 따라 암호화되며 무결성과 기밀성을 보장합니다.
- 케르크호프스의 원리에 따라서 키값이 노출되지 않는 한 보안성이 보장되어, 국군 보안사고를 원천 차단하는 것이 목표입니다.

- [x] 부대에서 긴급상황을 보고체계에 맞추어 보고할 수 있는 애플리케이션
- [x] 보고받은 상황을 암호와 하여 정보를 보호하는 애플리케이션

국군 야전 상황보고체계 (ROK Situation Reporting System)은 위에 나열된 문제에 대한 해결책이 될 것입니다.
상황이 상급 보고체계에 보고되기 전 각 부대 (여단, 대대, 독립중대) 지휘통제실에서 상황을 종합하고 지시사항을 하달하는 C4I 체계가 될 것입니다.
![Logo](https://i.ibb.co/2KDTRCD/Blank-board.png)

- 규정에 입각한 체계적인 보고체계를 준수하여 보고되어 상황조치 능력을 향상시킬 수 있다.
- 메모보고 기능으로 보고체계를 따르는 상황 보고를 올릴 수 있다.
- 채팅으로 긴급한 사항을 설명하고 추가 지시사항을 받을 수 있다.
- 저장된 부대 메모보고, 보고체계는 부대장이 관리하고 개선할 수 있다.
- 모든 보고사항은 암호와되며 기밀성과 무결성을 보장한다.

<a id = "market"></a>

**💸 목표 시장**

1. 독립중대, 대대, 단, 연대단위 군부대.
2. 군사경찰 부대.
3. 사령부 내부 부서/처.
4. 국정원, 경호원, 무기체계 개발팀 등 기밀 사항 연구 보직.

\
<a id = "features"></a>

## 📖 기능 설명

### 🔒 강력한 암호화

<table>
	<tr>
		<td align='center'>
			<img src="https://i.ibb.co/M2cbbWx/Symmetric-Encryption-1.png" />
		</td>
	</tr>
	<tr>
		<td align='center'><b>데이터베이스 객체 암호화</b></td>
	</tr>
	<tr>
		<td align='center' style = "text-align: center">
		대칭 암호화 체계를 이용해 데이터베이스 객체의 모든 항목을 암호화합니다. <br>
		암호화 키값은 키값 저장소에 안전하게 저장됩니다. 
		</td>
	</tr>
</table>

<table>
	<tr>
		<td align='center'>
			<img src="https://i.ibb.co/TLxbnph/Blank-diagram.png" />
		</td>
	</tr>
	<tr>
		<td align='center'><b>통신 암호화</b></td>
	</tr>
	<tr>
		<td align='center' style = "text-align: center">
		비대칭 암호화 체계를 이용해 군인들이 주고받는 메세지와 메모보고를 암호화합니다. <br>
		군인의 공개키값으로 통신 키를 암호화한 후, 군인이 비공개키값으로 키를 해독 할 수 있습니다. <br>
		암호화 키값은 키값 저장소에 안전하게 저장됩니다. 
		</td>
	</tr>
</table>

### 💥 AI를 통한 심각성/중요도 점수

<table>
	<tr>
		<td align='center'>
			<img src="https://i.ibb.co/BZRYGnN/AI.png" />
		</td>
	</tr>
	<tr>
		<td align='center'><b>AI가 보고사항에 대한 심각성/중요도 점수 파악</b></td>
	</tr>
	<tr>
		<td align='center' style = "text-align: center">
		명사와 동사를 감성분석기로 분석. <br>
		1~5 심각성/중요도 점수 반환 
		</td>
	</tr>
</table>

\
<a id="functions"></a>

### ⚙️화면 설계

<table>
	<tr>
		<td width="44%" align='center'><b>데스크탑 화면</b></td>
		<td width="22%" align='center'><b>모바일 화면</b></td>
		<td width="34%" align='center'><b>기능 설명</b></td>
	</tr>
	<tr>
		<td align="center">
		<img src="https://user-images.githubusercontent.com/68419358/198865106-c2e2b9bb-fa81-46f6-95b9-b1b3f04b0d16.PNG" alt="로그인페이지" />
		</td>
		<td align="center">
		<img src="https://user-images.githubusercontent.com/68419358/198867881-b4bc41aa-79de-4c51-b986-23176ea0f54a.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일로그인" />
		</td>
		<td>등록된 사용자의 로그인</td>
	</tr>
	<tr>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198865117-f317810b-84e0-49e0-bd40-7528d2b60b2f.PNG" alt="회원가입페이지" /></td>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198867898-7ab203a4-571f-4e87-b095-e995ece66830.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일회원가입" /></td>
		<td>부대로부터 초대 코드를 받은 장병 회원가입</td>
	</tr>
	<tr>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198865116-1bfcc644-bba5-44d4-a06e-0a4941f7df35.PNG" alt="홈페이지" /></td>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198867882-78df53f9-3d4d-4594-a7af-d84ff1928a9e.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일홈" /></td>
		<td>자신의 유저 정보 / 부대 정보 / 메모 보고 확인</td>
	</tr>
	<tr>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198865115-28fae6bd-05c2-41a8-8210-4ded72920aff.PNG" alt="조직도페이지" /></td>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198867886-ccde36c4-5b92-4cf3-b307-27791d8602f8.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일조직도" /></td>
		<td>같은 부대 내 장병들의 조직 체계 조회</td>
	</tr>
	<tr>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198865114-3132c66d-24cc-4a24-aabe-059f747947dc.PNG" alt="조직도세부페이지" /></td>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198867887-879ff28b-36b4-46a3-9889-77c7f37ef8ea.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일세부조직도" /></td>
		<td>조직도 내 장병의 세부 정보 확인<br/>권한에 따라 추가·수정·삭제</td>
	</tr>
	<tr>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198865108-41b5865a-2881-4c8a-b9d0-e73ae721bf4c.PNG" alt="메모보고페이지" /></td>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198867883-0e35397c-9f54-4e80-a287-ef983b583535.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일메모보고" /></td>
		<td>보고 체계를 따르는 군 내 메모보고 조회</td>
	</tr>
	<tr>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198865107-79daa5ba-7cfb-4046-9440-50e401bfc4d0.PNG" alt="메모보고작성창" /></td>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198867880-3e8c0c7a-0a3e-413c-818a-283432db797a.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일메모보고작성" /></td>
		<td>메모보고 업로드</td>
	</tr>
	<tr>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198865109-92b6de7a-c973-44a8-b8d0-b191b65725d9.PNG" alt="메세지페이지" /></td>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198867891-aac07311-21f7-40ec-a765-ed3d8b06611b.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일채팅방" /></td>
		<td>채팅 페이지</td>
	</tr>
	<tr>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198865103-3656e848-b7b8-4d71-815e-8c802df1e9db.PNG" alt="계정설정페이지" /></td>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198867888-eb7e6c42-5477-4fe7-a432-9aa519b5852f.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일계정설정" /></td>
		<td>서비스 내에서 사용되는 유저의 정보 확인</td>
	</tr>
	<tr>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198865113-e9ab9427-70b2-49dd-a8cc-5c40ef048830.PNG" alt="부대설정페이지" /></td>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198867892-6cc8e03c-674f-401e-bc3e-a55e75633c31.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일부대설정" /></td>
		<td>자신이 속한 부대 정보 조회<br/>권한에 따라 추가·수정·삭제 기능</td>
	</tr>
	<tr>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198865111-a04cf9e3-a88d-491b-b925-9b8efdf1cd4e.PNG" alt="보고체계설정페이지" /></td>
		<td align="center"><img src="https://user-images.githubusercontent.com/68419358/198867895-3a4fc982-d36c-4eca-995e-4f98e21315e8.jpeg" style="clip-path: inset(12px 0 18px 0)" alt="모바일보고체계" /></td>
		<td>상황 보고 단계에 대한 보고체계 리스트<br/>권한에 따라 추가·수정·삭제</td>
	</tr>
</table>

## 프로젝트 사용법 (Getting Started)

[데모 영상](https://www.youtube.com/watch?v=4J2cPialaMY)

\
<a id = "requirements"></a>

## 💻컴퓨터 구성 / 필수 조건 안내(Prerequisites)

- 최소: ECMAScript 6 지원 브라우저
- 권장: <a href="https://browsersl.ist/#q=last+2+versions">last 2 versions</a>

<img src="https://user-images.githubusercontent.com/68419358/198879212-9fbc5819-0cb0-4eed-8081-5d5e7888421b.png" alt="https://browsersl.ist/#q=last+2+versions">

## 📱모바일 구성 / 필수 조건 안내(Prerequisites)

- 최소: 안드로이드 운영체제 6.0(Marshmallow) 이상
- 권장: 안드로이드 운영체제 10.0 이상

\
<a id = "techniques"></a>

## 🔗기술 스택 (Technique Used)

### Development Stack

![img](https://i.ibb.co/Mg04TS5/Development-Stack.png)

### Web Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)

### Mobile Frontend

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

### Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### Database

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-2C384A?style=for-the-badge&logo=firebase&logoColor=FFCA28)

### Collaboration Tools

![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)

### Encryption Scheme

<table>
<tr>
	  <td align='center'>Logo</td>
	  <td align='center'>Name/Encryption Scheme</td>
	  <td align='center'>Purpose</td>
 </tr>
 <tr>
	  <td align='center'><img src = "https://upload.wikimedia.org/wikipedia/commons/2/2a/RSA_Security_logo2.svg" width = "55px" height = "30px"></td>
	  <td align='center'>RSA</td>
	  <td align='center'>비대칭 암호화 (암호화된 키 값 전송)</td>

 </tr>
  <tr>
	  <td align='center'><img src = "https://user-images.githubusercontent.com/52823519/198872012-f9999691-e701-4220-8cae-8dc802fbee98.png" width = "40px" height = "40px"></td>
	  	  <td align='center'>Crypto.js</td>
	  <td align='center'>대칭 암호화 기능 (AES, HMAC)</td>
 </tr>
   <tr>
	  <td align='center'><img src = "https://miro.medium.com/max/251/1*YUlYnXhu4NG61i-HRG50AQ.jpeg" width = "40px" height = "40px"></td>
	  	  <td align='center'>Azure Keystore</td>
	  <td align='center'>비밀 키 값 (Secret Key) 저장</td>
 </tr>
</table>

\
<a id = "installation"></a>

## 설치 안내 (Installation Process)

<a id = "backendinstall"></a>

#### Back-End

```bash
$ git clone https://github.com/osamhack2022-v2/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS.git
$ cd 'WEB&APP(BE)'
$ npm install
.env 파일 생성 후
$ npm run start
```

<a id = "frontendinstall"></a>

#### Front-End(WEB)

```bash
$ git clone https://github.com/osamhack2022-v2/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS.git
$ cd 'WEB(FE)'
$ npm install
.env 파일 생성 후
$ npm run dev
```

<a id = "appinstall"></a>

#### Front-End(APP)

```bash
Prerequisite: expo sign up

$ git clone https://github.com/osamhack2022-v2/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS.git
$ cd 'APP(FE)'
$ npm install
.env 파일 생성 후
$ npx eas build -p android --profile preview

빌드 진행 이후 .apk 파일을 본인의 스마트폰으로 이동하여 설치
```

<a id="opensource"></a>

\
## 오픈소스(Open-Sources)

### MIT License

- mongoose
- jsonwebtoken
- bcryptjs
- cors
- colors
- express-async-handler
- mongoose-encryption
- nodemon
- nodepapago
- socket.io
- wink-pos-tagger
- cookies-next
- react-draggable
- react-infinite-scroll-component
- react-organizational-chart
- crypto-js
- uuid
- jose
- react-navigation
- react-native-paper
- react-native-async-storage
- react-native-dropdown-picker
- react-native-gifted-chat
- recoil

### Others

- dotenv [BSD-2-Clause]
- react-firebase-hooks [Apache-2.0]
- classificator [none]

<a id = "team"></a>

## 팀 정보 (Team Information)

<table>
 <tr>
	  <td></td>
	  <td align='center'>이름</td>
	  <td align='center'>역할</td>
	  <td align='center'>GitHub</td>
	  <td align='center'>Contacts</td>
 </tr>
 <tr>
	  <td align='center'><img src="https://i.imgur.com/5NlzJuu_d.webp?maxwidth=760&fidelity=grand" width="50" height="63"></td>
	  <td align='center'>김상영, 팀장</td>
	  <td align='center'>암호화</td>
	  <td align='center'><a href="https://github.com/s3kim2018"><img src="http://img.shields.io/badge/s3kim2018-green?style=social&logo=github"/></a></td>
	  <td align='center'><a href="s3kim2018@berkeley.edu"><img src="https://img.shields.io/badge/s3kim2018@berkeley.edu-green?logo=gmail&style=social"/></a></td>
 </tr>
 <tr>
	  <td align='center'><img src="https://user-images.githubusercontent.com/68419358/197472945-18b649a8-3c68-48a8-9f6a-15506f0068a6.jpg" width="50" height="63"></td>
	  <td align='center'>최윤성</td>
	  <td align='center'>프론트엔드(WEB)</td>
	  <td align='center'><a href="https://github.com/marunemo"><img src="http://img.shields.io/badge/marunemo-green?style=social&logo=github"/></a></td>
	  <td align='center'><a href="chys3697@gmail.com"><img src="https://img.shields.io/badge/chys3697@gmail.com-green?logo=gmail&style=social"/></a></td>
 </tr>
 <tr>
	<td align='center'><img src="https://user-images.githubusercontent.com/113012760/198868295-88d8a91b-8c91-4b6a-b180-f092c3304e32.jpg" width="50" height="63"></td>
  <td align='center'>김형민</td>
  <td align='center'>프론트엔드(APP) 개발자</td>
	<td align='center'><a href="https://github.com/gudmin0526"><img src="http://img.shields.io/badge/gudmin0526-green?style=social&logo=github"/></a></td>
  <td align='center'><a href="gudmin0526@gmail.com"><img src="https://img.shields.io/badge/gudmin0526@gmail.com-green?logo=gmail&style=social"/></a></td>
 </tr>
 <tr>
	  <td align='center'><img src="https://user-images.githubusercontent.com/52823519/195992813-c10b8189-7a98-4e8c-8f08-53ef9cdb7803.png" width="50" height="63"></td>
	  <td align='center'>조영효</td>
	  <td align='center'>백엔드</td>
	  <td align='center'><a href="https://github.com/yhcho0405"><img src="http://img.shields.io/badge/yhcho0405-green?style=social&logo=github"/></a></td>
	  <td align='center'><a href="yhcho0405@kakao.com"><img src="https://img.shields.io/badge/yhcho0405@kakao.com-green?logo=gmail&style=social"/></a></td>
 </tr>
</table>

<a id = "documentation"></a>

## 문서 (Documentation)

- [암호화 체계](https://github.com/osamhack2022-v2/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS/wiki/%EC%95%94%ED%98%B8%ED%99%94-%EC%B2%B4%EA%B3%84)
- [백엔드 Docs](https://github.com/osamhack2022-v2/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS/wiki/Backend-Docs)
- [Figma](https://www.figma.com/file/U4mcvflCMxzbLcmGABrCUy/SRS?node-id=0%3A1)
- [시연 영상](https://www.youtube.com/watch?v=4J2cPialaMY)
- [발표 자료](https://docs.google.com/presentation/d/1xoaN6NwMw7Pc6bkBr5REyQXApMOlUOQPs59Sq_nAH0U/edit?usp=sharing)
- [Git Commit Convention](https://github.com/osamhack2022-v2/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS/wiki/Git-Commit-Convention)
  <a id = "copyright"></a>

## 저작권 및 사용권 정보 (Copyleft / End User License)

- [MIT](https://github.com/osamhack2022-v2/WEB_APP_ROK-Situation-Reporting-System_ROK-SRS/blob/main/LICENSE.md)

This project is licensed under the terms of the MIT license.
