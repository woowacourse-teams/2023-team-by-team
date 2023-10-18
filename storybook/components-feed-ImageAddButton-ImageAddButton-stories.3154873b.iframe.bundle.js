"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8439],{"./src/components/feed/ImageAddButton/ImageAddButton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"feed/ImageAddButton",component:__webpack_require__("./src/components/feed/ImageAddButton/ImageAddButton.tsx").Z,tags:["autodocs"],argTypes:{onChangeImage:{description:"사용자가 새로운 파일을 업로드하여 파일의 내용물에 변동사항이 생길 경우 호출되는 함수입니다. 여기에 파일을 업로드하기 위한 함수를 넣어 주세요."}},parameters:{docs:{description:{component:"`ImageAddButton` 은 채팅에서 이미지 등록을 위해 사용하는 버튼입니다.\n 클릭 시에 별도의 이벤트는 발생하지 않지만, 파일 업로드 프롬프트를 띄우며 선택된 파일이 변경되었을 경우 이벤트를 호출합니다."}}}},Default={args:{onChangeImage:()=>{alert("onChangeImage")}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    onChangeImage: () => {\n      alert('onChangeImage');\n    }\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/feed/ImageAddButton/ImageAddButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ImageAddButton_ImageAddButton});var svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const FakeButton=styled_components_browser_esm.zo.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 96px;
  height: 96px;

  border-radius: 12px;
  background-color: #dee1ff;

  transition: 0.2s;

  cursor: pointer;

  &:hover {
    background-color: #e8eaff;
  }

  & svg {
    color: #9792ff;
  }
`,FileUploadInput=styled_components_browser_esm.zo.input`
  display: none;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ImageAddButton=props=>{const{onChangeImage}=props;return(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(FakeButton,{role:"button","aria-label":"이미지 추가",children:(0,jsx_runtime.jsx)(svg.pO,{})}),(0,jsx_runtime.jsx)(FileUploadInput,{type:"file",accept:"image/*",onChange:onChangeImage,multiple:!0})]})};ImageAddButton.displayName="ImageAddButton";const ImageAddButton_ImageAddButton=ImageAddButton;try{ImageAddButton.displayName="ImageAddButton",ImageAddButton.__docgenInfo={description:"",displayName:"ImageAddButton",props:{onChangeImage:{defaultValue:null,description:"",name:"onChangeImage",required:!0,type:{name:"(e: ChangeEvent<HTMLInputElement>) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ImageAddButton/ImageAddButton.tsx#ImageAddButton"]={docgenInfo:ImageAddButton.__docgenInfo,name:"ImageAddButton",path:"src/components/feed/ImageAddButton/ImageAddButton.tsx#ImageAddButton"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-feed-ImageAddButton-ImageAddButton-stories.3154873b.iframe.bundle.js.map