"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8006],{"./src/components/feed/ImageUploadDrawer/ImageUploadDrawer.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Opened:()=>Opened,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ImageUploadDrawer_stories});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  position: absolute;
  bottom: 46px;
  left: 30px;

  width: calc(100% - 60px);
  height: 136px;

  border-radius: 20px 20px 0 0;
  background: linear-gradient(30deg, #bfc3ff, #eaebff);

  transition: 0.35s;
  transform: translateY(${({isOpen})=>isOpen?"-163px":"0"});
`,ContentWrapper=styled_components_browser_esm.zo.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-grow: 1;

  padding: 20px 20px 0 20px;
`,CloseButtonWrapper=styled_components_browser_esm.zo.div`
  width: 64px;
  height: 100%;
  padding: 14px;
`,closeButton=styled_components_browser_esm.iv`
  width: 36px;
  height: 36px;
  padding: 0;

  svg {
    width: 36px;
    height: 36px;
  }

  svg > path {
    fill: #7f84ff;
  }
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ImageUploadDrawer=props=>{const{isOpen,onClose,children,isUploading}=props;return(0,jsx_runtime.jsxs)(Container,{isOpen,children:[(0,jsx_runtime.jsx)(ContentWrapper,{children}),!isUploading&&(0,jsx_runtime.jsx)(CloseButtonWrapper,{children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:closeButton,onClick:onClose,"aria-label":"이미지 업로드 메뉴 닫기",children:(0,jsx_runtime.jsx)(svg.gH,{})})})]})};ImageUploadDrawer.displayName="ImageUploadDrawer";const ImageUploadDrawer_ImageUploadDrawer=ImageUploadDrawer;try{ImageUploadDrawer.displayName="ImageUploadDrawer",ImageUploadDrawer.__docgenInfo={description:"",displayName:"ImageUploadDrawer",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},isUploading:{defaultValue:null,description:"",name:"isUploading",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ImageUploadDrawer/ImageUploadDrawer.tsx#ImageUploadDrawer"]={docgenInfo:ImageUploadDrawer.__docgenInfo,name:"ImageUploadDrawer",path:"src/components/feed/ImageUploadDrawer/ImageUploadDrawer.tsx#ImageUploadDrawer"})}catch(__react_docgen_typescript_loader_error){}const ImageUploadDrawer_stories={title:"feed/ImageUploadDrawer",component:ImageUploadDrawer_ImageUploadDrawer,tags:["autodocs"],decorators:[Story=>(0,jsx_runtime.jsx)("div",{style:{width:"100%",height:"500px",border:"1px solid black",position:"relative"},children:(0,jsx_runtime.jsx)(Story,{})})],argTypes:{isOpen:{description:"서랍장이 열려 있는지의 여부입니다. 이 prop을 조작하여 서랍장을 열고 닫을 수 있습니다."},children:{description:"랜더링할 자식 요소를 의미합니다. `ThumbnailList` 컴포넌트가 여기에 오면 됩니다."},onClose:{description:"서랍장이 닫히게 될 때 실행시킬 함수를 의미합니다. 서랍장을 실질적으로 닫는 함수를 여기에 넣어 주시면 됩니다."}},parameters:{docs:{description:{component:"`ImageUploadDrawer`는 이미지 업로드 메뉴를 담고 있는 서랍장 컴포넌트입니다. 사용자의 의사에 따라 열고 닫을 수 있습니다.\n이 컴포넌트는 `position: absolute` 속성을 가지며, 기본적으로 최하단에 위치할 것입니다. 컴포넌트를 사용하기 위해서는 부모 요소에 `display: relative` 속성을 적용해 주셔야 합니다.\n스토리에 표시되는 검은 윤곽선의 컨테이너는 단지 이해를 돕기 위한 것으로, 컴포넌트에 포함되지 않습니다."}}}},Default={args:{isOpen:!1,children:(0,jsx_runtime.jsx)("div",{style:{fontSize:"32px",padding:"40px"},children:"이 자리에 썸네일 리스트 컴포넌트가 올 것입니다."}),onClose:()=>{alert("onClose();")},isUploading:!1}},Opened={args:{isOpen:!0,children:(0,jsx_runtime.jsx)("div",{style:{fontSize:"32px",padding:"40px"},children:"이 자리에 썸네일 리스트 컴포넌트가 올 것입니다."}),onClose:()=>{alert("onClose();")},isUploading:!1}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    isOpen: false,\n    children: <div style={{\n      fontSize: '32px',\n      padding: '40px'\n    }}>\n        이 자리에 썸네일 리스트 컴포넌트가 올 것입니다.\n      </div>,\n    onClose: () => {\n      alert('onClose();');\n    },\n    isUploading: false\n  }\n}",...Default.parameters?.docs?.source}}},Opened.parameters={...Opened.parameters,docs:{...Opened.parameters?.docs,source:{originalSource:"{\n  args: {\n    isOpen: true,\n    children: <div style={{\n      fontSize: '32px',\n      padding: '40px'\n    }}>\n        이 자리에 썸네일 리스트 컴포넌트가 올 것입니다.\n      </div>,\n    onClose: () => {\n      alert('onClose();');\n    },\n    isUploading: false\n  }\n}",...Opened.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Opened"]},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.iv`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.zo.button`
  font-size: 16px;
  line-height: 16px;
  text-align: center;

  ${({size="md"})=>styled_components_browser_esm.iv`
      padding: ${paddingSize[size]};
    `};

  ${({variant="primary"})=>variants[variant]};

  ${({variant="primary"})=>{if("plain"!==variant)return styled_components_browser_esm.iv`
        &:disabled {
          opacity: 0.6;
        }

        &:not([disabled]):hover {
          opacity: 0.8;
        }

        border-radius: 4px;

        transition: 0.2s;
      `}};

  ${props=>props.css}
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-feed-ImageUploadDrawer-ImageUploadDrawer-stories.b20bbb16.iframe.bundle.js.map