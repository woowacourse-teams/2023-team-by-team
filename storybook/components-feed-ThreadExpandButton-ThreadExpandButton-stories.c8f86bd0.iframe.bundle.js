"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1372],{"./src/components/feed/ThreadExpandButton/ThreadExpandButton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Expanded:()=>Expanded,ExpandedAndSentByMe:()=>ExpandedAndSentByMe,NotExpanded:()=>NotExpanded,NotExpandedAndSentByMe:()=>NotExpandedAndSentByMe,Small:()=>Small,SmallAndSentByMe:()=>SmallAndSentByMe,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _ThreadExpandButton__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/feed/ThreadExpandButton/ThreadExpandButton.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Feed/ThreadExpandButton",component:_ThreadExpandButton__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"],decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{position:"relative",padding:"40px",backgroundColor:"#404040"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})})],parameters:{docs:{description:{component:"`ThreadExpandButton` 은 스레드 및 공지 스레드에서의 펼치기/접기 기능을 사용하기 위한 버튼입니다.\n **더 이상 이 컴포넌트는 `position: absolute`를 지니지 않도록 변경되었음에 유의하세요.**"}}}},NotExpanded={args:{isExpanded:!1,isMe:!1}},Expanded={args:{isExpanded:!0,isMe:!1}},Small={args:{isExpanded:!1,isMe:!1,size:"sm"}},NotExpandedAndSentByMe={args:{isExpanded:!1,isMe:!0}},ExpandedAndSentByMe={args:{isExpanded:!0,isMe:!0}},SmallAndSentByMe={args:{isExpanded:!1,isMe:!0,size:"sm"}};NotExpanded.parameters={...NotExpanded.parameters,docs:{...NotExpanded.parameters?.docs,source:{originalSource:"{\n  args: {\n    isExpanded: false,\n    isMe: false\n  }\n}",...NotExpanded.parameters?.docs?.source},description:{story:"검은 배경은 단지 컴포넌트의 랜더링 결과 잘 보이게 하기 위함이며, 실제로는 컴포넌트에 포함되지 않습니다.",...NotExpanded.parameters?.docs?.description}}},Expanded.parameters={...Expanded.parameters,docs:{...Expanded.parameters?.docs,source:{originalSource:"{\n  args: {\n    isExpanded: true,\n    isMe: false\n  }\n}",...Expanded.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    isExpanded: false,\n    isMe: false,\n    size: 'sm'\n  }\n}",...Small.parameters?.docs?.source}}},NotExpandedAndSentByMe.parameters={...NotExpandedAndSentByMe.parameters,docs:{...NotExpandedAndSentByMe.parameters?.docs,source:{originalSource:"{\n  args: {\n    isExpanded: false,\n    isMe: true\n  }\n}",...NotExpandedAndSentByMe.parameters?.docs?.source}}},ExpandedAndSentByMe.parameters={...ExpandedAndSentByMe.parameters,docs:{...ExpandedAndSentByMe.parameters?.docs,source:{originalSource:"{\n  args: {\n    isExpanded: true,\n    isMe: true\n  }\n}",...ExpandedAndSentByMe.parameters?.docs?.source}}},SmallAndSentByMe.parameters={...SmallAndSentByMe.parameters,docs:{...SmallAndSentByMe.parameters?.docs,source:{originalSource:"{\n  args: {\n    isExpanded: false,\n    isMe: true,\n    size: 'sm'\n  }\n}",...SmallAndSentByMe.parameters?.docs?.source}}};const __namedExportsOrder=["NotExpanded","Expanded","Small","NotExpandedAndSentByMe","ExpandedAndSentByMe","SmallAndSentByMe"];try{NotExpanded.displayName="NotExpanded",NotExpanded.__docgenInfo={description:"검은 배경은 단지 컴포넌트의 랜더링 결과 잘 보이게 하기 위함이며, 실제로는 컴포넌트에 포함되지 않습니다.",displayName:"NotExpanded",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThreadExpandButton/ThreadExpandButton.stories.tsx#NotExpanded"]={docgenInfo:NotExpanded.__docgenInfo,name:"NotExpanded",path:"src/components/feed/ThreadExpandButton/ThreadExpandButton.stories.tsx#NotExpanded"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.iv`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.zo.button.withConfig({shouldForwardProp:prop=>!["css","variant","size"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
  h1&,
  h2&,
  h3&,
  h4&,
  h5&,
  h6& {
    font-weight: bold;
  }
  h1& {
    font-size: 36px;
  }
  h2& {
    font-size: 32px;
  }
  h3& {
    font-size: 28px;
  }
  h4& {
    font-size: 24px;
  }
  p&,
  span&,
  strong&,
  small& {
    font-size: ${({size="md"})=>fontSize[size]||"initial"};
    font-weight: ${({weight="normal"})=>fontWeight[weight]||"initial"};
  }
  && {
    ${props=>props.css}
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ThreadExpandButton/ThreadExpandButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ThreadExpandButton_ThreadExpandButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 100%;
  height: 100%;
`,expandButton=(isMe,size)=>styled_components_browser_esm.iv`
  width: 100%;
  height: ${"md"===size?"80px":"70px"};
  padding: 30px 10px 10px 10px;
  margin-top: -30px;

  ${isMe?styled_components_browser_esm.iv`
        border-bottom-left-radius: 12px;
      `:styled_components_browser_esm.iv`
        border-radius: 0 0 12px 12px;
      `}
  background: ${({theme})=>isMe?theme.gradient.BLURPLE("50px"):theme.gradient.WHITE("50px")};

  color: ${({theme})=>isMe?theme.color.WHITE:theme.color.BLACK};

  & svg {
    width: ${"md"===size?"32px":"26px"};
  }
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ThreadExpandButton=props=>{const{isExpanded,isMe=!1,size="md",onClick}=props;return(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",css:expandButton(isMe,size),onClick,children:(0,jsx_runtime.jsx)(Container,{children:isExpanded?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",size:"md"===size?"lg":"md",children:"접기"}),(0,jsx_runtime.jsx)(svg.j_,{})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",size:"md"===size?"lg":"md",children:"더 보기"}),(0,jsx_runtime.jsx)(svg.gV,{})]})})})};ThreadExpandButton.displayName="ThreadExpandButton";const ThreadExpandButton_ThreadExpandButton=ThreadExpandButton;try{ThreadExpandButton.displayName="ThreadExpandButton",ThreadExpandButton.__docgenInfo={description:"",displayName:"ThreadExpandButton",props:{isExpanded:{defaultValue:null,description:"",name:"isExpanded",required:!0,type:{name:"boolean"}},isMe:{defaultValue:null,description:"",name:"isMe",required:!1,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThreadExpandButton/ThreadExpandButton.tsx#ThreadExpandButton"]={docgenInfo:ThreadExpandButton.__docgenInfo,name:"ThreadExpandButton",path:"src/components/feed/ThreadExpandButton/ThreadExpandButton.tsx#ThreadExpandButton"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-feed-ThreadExpandButton-ThreadExpandButton-stories.c8f86bd0.iframe.bundle.js.map