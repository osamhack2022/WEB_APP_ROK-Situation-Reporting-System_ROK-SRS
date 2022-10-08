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


## 💡프로잭트 소개
 - 군에선 신속하고 정확한 상황전파가 중요합니다. 대대 이상 단위의 부대는 KJCCS 보고체계를 갖추어 부대 내 비상 상황이 발생했을 시 KJCCS로 단/연대 -> 사령부/사단으로 보고를 올려 VTC를 통해 신속한 대책을 세울 수 있습니다. 하지만 중대, 소대, 분대 단위에서는 상황전파에 어려움이 많습니다. 구두보고와 유선보고가 비효율적인 나머지 많은 간부님은 대대 내 상황전파를 카카오톡과 문 자 메시지를 사용하고 계십니다. 군 내부의 상황을 타사 애플리케이션을 이용해 전파하는 게 보안상 안전하지 않습니다. 기밀 사항을 실수로 다른 사람에게 전달할 수 있는 위험성이 존재하며 타사 애플리케이션이 해킹당하면 저장된 자료가 암호화되어있다는 보장도 없습니다. 또한, 적군이 사회 공학을 이용하여 부대 내 상황을 전달받을 수 있는 위험도 있습니다. 또한, 상황 보고의 능률을 높이는 것을 목표로 하고 있습니다. 구두보고의 경우 상황의 해결책을 마련해줄 간부님들을 찾아다니는 일이 발생하고 상황이 변질하여 터졌을 때 재전파가 어렵습니다. 상황을 묶어 채팅방으로 신속하게 재전파할 수 있고 도움을 요청할 수 있는 체계를 만들 계획입니다. 바뀌는 상황속에서 간부님들이 효과적으로 방안책을 제시하여 사건이 대책 없이 커지는 현상을 방지할 수 있습니다. 
- 대대/독립중대 단위로 군 보고체계를 통한 상황전파, 애로 및 건의 사항 전달, 명령 사항 전파를 손쉽게 할 수 있는 웹 애플리케이션 입니다. 상황전파와 건의 사항 전달 보고 시, 분대장 -> 소대장 -> 중대장 -> 대대장 순서로 결재되는 시스템 입니다. 기본적으로 용사의 소속된 중대의 보고체계를 따르지만, 필요시 다른 보고체계(당직, 의무 등)도 추가할 수 있는 융통성 있는 체계입니다. 또한, 지휘관이 관련성 있는 전파상황들을 한 그룹으로 묶어 의견 수령 및 지시사항을 내릴 수 있는 채팅방을 지원합니다. 현재 부대 내 상황 전파할 때 사용되는 카톡방/문자 메시지를 대신하는 체제입니다. 부대 내의 모든 전파사항은 암호문 비구별성 원칙(IND-CPA)에 따라 암호화되며 무결성과 기밀성을 보장합니다. 케르크호프스의 원리에 따라서 키값이 노출되지 않는 한 보안성이 보장되고 국군 보안사고가 일어나지 않도록 하는 것이 목표입니다.
 
- <효과 및 전망> 
1. 구두보고/유선보고보다 더욱 효율적이고 체게적인 병사 -> 간부 보고체게를 구축합니다. 
2. 간부가 보고에 실시간으로 지시사항을 내릴 수 있는 답변/체팅 방을 구축하여 신속한 대쳐를 가능하게 합니다. 
3. 국군 야전 상황보고체계는 모든 대화를 암호화하고 디지털 서명을 첨부해 부대 상황을 안전하게 전달 할 수 있는 체계를 만듭니다. 
- <목표 시장> 
1. 국군에 근무중인 간부
2. 군무원 및 병사

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
