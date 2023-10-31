"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6039],{"./src/components/common/HeaderFallback/HeaderFallback.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>HeaderFallback_stories});var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Skeleton=__webpack_require__("./src/components/common/Skeleton/Skeleton.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.ZP.header`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 64px;
  padding: 0 14px;

  border-bottom: 2px solid ${({theme})=>theme.color.GRAY200};
`,InnerContainer=styled_components_browser_esm.ZP.div`
  display: flex;
  column-gap: 20px;

  & > div {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }
`,ButtonContainer=styled_components_browser_esm.ZP.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;
  }

  & > button:not(last-child) {
    width: 44px;
    height: 44px;
  }

  & > button:last-child {
    width: 50px;
    height: 50px;
  }
`,Divider=styled_components_browser_esm.ZP.div`
  width: 1px;
  height: 24px;

  background-color: ${({theme})=>theme.color.GRAY500};
`,TeamBadgePlaceholder=styled_components_browser_esm.ZP.div`
  width: 24px;
  height: 24px;

  border-radius: 50%;
  background-color: ${({theme})=>theme.color.GRAY200};
`,TeamPlaceMenuPlaceholder=styled_components_browser_esm.ZP.div`
  width: 300px;
  height: 40px;

  border-radius: 4px;
  background-color: ${({theme})=>theme.color.GRAY200};
`,ProfileImagePlaceholder=styled_components_browser_esm.ZP.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: ${({theme})=>theme.color.GRAY200};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const HeaderFallback=()=>(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(InnerContainer,{children:[(0,jsx_runtime.jsx)(svg.K7,{}),(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(TeamBadgePlaceholder,{children:(0,jsx_runtime.jsx)(Skeleton.Z,{variant:"circle"})}),(0,jsx_runtime.jsx)(TeamPlaceMenuPlaceholder,{children:(0,jsx_runtime.jsx)(Skeleton.Z,{})})]})]}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",disabled:!0,children:(0,jsx_runtime.jsx)(svg.Ww,{})}),(0,jsx_runtime.jsx)(Divider,{}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",disabled:!0,children:(0,jsx_runtime.jsx)(ProfileImagePlaceholder,{children:(0,jsx_runtime.jsx)(Skeleton.Z,{variant:"circle"})})})]})]});HeaderFallback.displayName="HeaderFallback";const HeaderFallback_stories={title:"common/HeaderFallback",component:HeaderFallback,tags:["autodocs"]},Default={args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Skeleton/Skeleton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Skeleton_Skeleton});const Wrapper=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").ZP.div.withConfig({shouldForwardProp:prop=>!["variant","css"].includes(prop)})`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.03);
  border-radius: ${({variant})=>"circle"===variant?"50%":"4px"};

  ${({css})=>css}

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.06),
      transparent
    );

    animation: ${({theme})=>theme.animation.loading} 1.5s linear 0.5s
      infinite;

    content: '';
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Skeleton=props=>{const{variant="normal",css}=props;return(0,jsx_runtime.jsx)(Wrapper,{variant,css})};Skeleton.displayName="Skeleton";const Skeleton_Skeleton=Skeleton;try{Skeleton.displayName="Skeleton",Skeleton.__docgenInfo={description:"",displayName:"Skeleton",props:{variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"circle"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Skeleton/Skeleton.tsx#Skeleton"]={docgenInfo:Skeleton.__docgenInfo,name:"Skeleton",path:"src/components/common/Skeleton/Skeleton.tsx#Skeleton"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-common-HeaderFallback-HeaderFallback-stories.5e539c4b.iframe.bundle.js.map