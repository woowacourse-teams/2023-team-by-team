"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3474],{"./src/components/common/BackButton/BackButton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,HrefSpecified:()=>HrefSpecified,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _BackButton__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/BackButton/BackButton.tsx"),_constants_routes__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/routes.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"common/BackButton",component:_BackButton__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"],argTypes:{label:{description:"버튼에 보이게 할 텍스트입니다."},href:{description:"클릭 시 어느 주소로 이동시킬 것인지를 여기에 명시해 주시면 됩니다. **단, 이 주소는 팀바팀 내의 주소여야 합니다.** 명시되지 않을 경우 버튼이 클릭되면 이전 페이지로 이동시킵니다."}},parameters:{docs:{description:{component:"`BackButton` 은 왼쪽 화살표가 있는 디자인의 버튼으로, 클릭 시 특정 주소로 이동시키는 역할을 수행하는 버튼입니다.\n기본적으로 이전 페이지로 이동시키며, 특정 주소를 명시하면 그 주소로 이동합니다. **단, 이 주소는 팀바팀 내의 주소여야 합니다.**"}}}},Default={args:{label:"뒤로가기"}},HrefSpecified={args:{label:"모아보기 페이지로 이동",href:_constants_routes__WEBPACK_IMPORTED_MODULE_1__.y.TEAM_OVERVIEW}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: '뒤로가기'\n  }\n}",...Default.parameters?.docs?.source}}},HrefSpecified.parameters={...HrefSpecified.parameters,docs:{...HrefSpecified.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: '모아보기 페이지로 이동',\n    href: PATH_NAME.TEAM_OVERVIEW\n  }\n}",...HrefSpecified.parameters?.docs?.source}}};const __namedExportsOrder=["Default","HrefSpecified"]},"./src/components/common/BackButton/BackButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>BackButton_BackButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const ArrowLeftIconWrapper=styled_components_browser_esm.zo.div`
  transition: 0.3s;
  transform: translateX(6px);

  button:hover > & {
    transform: translateX(0);
  }
`,backButton=styled_components_browser_esm.iv`
  display: inline-flex;
  align-items: center;
  column-gap: 12px;

  height: 42px;
  padding: 4px;
`;var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),svg=__webpack_require__("./src/assets/svg/index.ts"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const BackButton=props=>{const{label,href}=props,navigate=(0,dist.s0)();return(0,jsx_runtime.jsxs)(Button.Z,{type:"button",variant:"plain",css:backButton,onClick:()=>{navigate(href||-1)},children:[(0,jsx_runtime.jsx)(ArrowLeftIconWrapper,{children:(0,jsx_runtime.jsx)(svg.ZC,{})}),(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",children:label})]})};BackButton.displayName="BackButton";const BackButton_BackButton=BackButton;try{BackButton.displayName="BackButton",BackButton.__docgenInfo={description:"",displayName:"BackButton",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"enum",value:[{value:'"/"'},{value:'"/policy"'},{value:'"/login"'},{value:'"/start"'},{value:'"/join"'},{value:'"/create"'},{value:'"/team"'},{value:'"/team/overview"'},{value:'"/team/calendar"'},{value:'"/team/feed"'},{value:'"/team/link"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/BackButton/BackButton.tsx#BackButton"]={docgenInfo:BackButton.__docgenInfo,name:"BackButton",path:"src/components/common/BackButton/BackButton.tsx#BackButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/routes.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>PATH_NAME});const PATH_NAME={LANDING:"/",POLICY:"/policy",LOGIN:"/login",START:"/start",JOIN:"/join",CREATE:"/create",TEAM_SELECT:"/team",TEAM_OVERVIEW:"/team/overview",TEAM_CALENDAR:"/team/calendar",TEAM_FEED:"/team/feed",TEAM_LINK:"/team/link"}}}]);
//# sourceMappingURL=components-common-BackButton-BackButton-stories.9eb5998b.iframe.bundle.js.map