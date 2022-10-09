# 국군 야전 상황보고체계, ROK Situation Reporting System
![Logo](https://i.ibb.co/VQqT63J/450-300px-300-100px-900-300px.png)

# Table of Contents
1. [프로잭트 소개](#💡프로잭트-소개	)
2. [기능 설명](#📖기능-설명)
3. [컴퓨터 구성 / 필수 조건 안내 (Prerequisites)](#requirements)
4. [기술 스택 (Technique Used) ](#techniques)
5. [설치 안내 (Installation Process) ](#installation)
6. [팀 정보 (Team Information) ](#team)
7. [저작권 및 사용권 정보 (Copyleft / End User License) ](#copyright)


## 📢프로잭트 소개

**🚩문제점 재시**

    "7생활관 전원 코로나 걸렸데. 대대장님께 카톡으로 보고드려"
    "오늘 훈련한 거 사진 찍어서 대대 단톡방에 올려"
    "후임이 다쳤는데 군 전화도 주변에 없네… 어떻게 보고를 하지?"
    "밥이 너무 맛이 없는데 건의를 어떻게 하지? 연대장님께 전화해볼까?" 

군부대 내부에서 활용하는 보고체계가 없습니다.

부대 내부 상황 보고는 카카오톡, 문자, 메신저 등 타사 애플리케이션을 통해 이루어지고 있는 상황입니다. 이는 부대 기밀 사항을 제삼자에게 전해주는 것과 다를 게 없습니다. 우리는 타사 애플리케이션들이 받은 데이터를 어떻게 처리하는지 잘 알지 못하고 암호화하지 않은 경우 해킹당할 시 적군이 손쉽게 부대 실정을 파악할 수 있습니다. 

보안성에 문제가 있을 뿐만 아니라, 군에서 원칙적으로 쓰이는 보고체계를 지키지 않고 바로 지휘관에게 보고하는 상황도 많이 발생합니다. 지휘관이 중요한 보고를 받아야 하는 상황에 모든 상황 보고가 부대 지휘관에게 보고된다면 상황 조치 능력에 큰 차질이 생길 것입니다. 

**💡 문제에 대한 해결책**

 - [x] 부대에서 긴급상황을 보고체계에 맞추어 보고할 수 있는 애플리케이션
 - [x] 보고받은 상황을 암호와 하여 정보를 보호하는 애플리케이션

국군 야전 상황보고체계 (ROK Situation Reporting System)은 위에 나열된 문제에 대한 해결책이 될 것입니다.
상황이 상급 보고체계에 보고되기 전 각 부대 (여단, 대대, 독립중대) 지휘통제실에서 상황을 종합하고 지시사항을 하달하는 C4I 체계가 될 것입니다.
![Logo](https://i.im.ge/2022/10/09/1GLBkT.Blank-board.png)
 - 메모보고 기능으로 보고체계를 따르는 상황 보고를 올릴 수 있다. 
 - 채팅으로 긴급한 사항을 설명하고 추가 지시사항을 받을 수 있다.
 - 저장된 부대 메모보고, 보고체계는 부대장이 관리하고 개선할 수 있다. 
 - 모든 보고사항은 암호와되며 기밀성과 무결성을 보장한다. 

 **💸 목표 시장**
1. 독립중대, 대대, 단, 연대단위 군부대.
2. 군사경찰 부대.
3. 사령부 내부 부서/처.
4. 국정원, 경호원, 무기체계 개발팀 등 기밀 사항 연구 보직.


## 📖기능 설명
 - 설명 기입

<a id = "requirements"></a>
## 💻컴퓨터 구성 / 필수 조건 안내
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

<a id = "techniques"></a>
## 기술 스택 (Technique Used) 

### Server(back-end)
 -  nodejs, php, java 등 서버 언어 버전 
 - express, laravel, sptring boot 등 사용한 프레임워크 
 - DB 등 사용한 다른 프로그램 
 
### Front-end
 -  react.js, vue.js 등 사용한 front-end 프레임워크 
 -  UI framework
 - 기타 사용한 라이브러리

<a id = "installation"></a>
## 설치 안내 (Installation Process)
```bash
$ git clone git주소
$ yarn or npm install
$ yarn start or npm run start
```

## 프로젝트 사용법 (Getting Started)
**마크다운 문법을 이용하여 자유롭게 기재**

 <a id = "team"></a>
## 팀 정보 (Team Information)
- 김상영, Github Id: s3kim2018
- 최윤성, Github Id: marunemo
- 김형민, Github Id: gudmin0526
- 조영효, Github Id: yhcho0405

<a id = "copyright"></a>
## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.
