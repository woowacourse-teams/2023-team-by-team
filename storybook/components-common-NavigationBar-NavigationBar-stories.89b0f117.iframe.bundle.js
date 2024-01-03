"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2939],{"./src/components/common/NavigationBar/NavigationBar.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>NavigationBar_stories});var dist=__webpack_require__("./node_modules/react-router/dist/index.js"),routes=__webpack_require__("./src/constants/routes.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),react_router_dom_dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js");const Nav=styled_components_browser_esm.zo.nav`
  display: flex;
  ${({$isMobile})=>$isMobile?styled_components_browser_esm.iv`
        width: 100%;
        height: 60px;
      `:styled_components_browser_esm.iv`
      width: 70px;
      height: 100%;
      padding: 14px 0 18px 0;
    `}
`,MenuContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;

  width: 100%;
  ${({$isMobile})=>$isMobile?styled_components_browser_esm.iv`
        justify-content: space-between;
      `:styled_components_browser_esm.iv`
      flex-direction: column;

      gap: 30px;
    `}
`,MenuLink=(0,styled_components_browser_esm.zo)(react_router_dom_dist.OL)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 62px;
  height: 62px;
  padding: 4px;

  border-radius: 50%;

  &:hover,
  &:focus {
    background-color: ${({theme})=>theme.color.GRAY200};
  }

  & > span {
    margin-top: 3px;
    font-size: 13px;
  }

  &.active {
    background-color: ${({theme})=>theme.color.GRAY200};
  }
`,teamAddButton=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 62px;
  height: 62px;
  padding: 4px;

  border-radius: 50%;

  &:hover,
  &:focus {
    background-color: ${({theme})=>theme.color.GRAY200};
  }
`,teamAddText=styled_components_browser_esm.iv`
  font-size: 11px;
`;var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const NavigationBar=()=>{const navigate=(0,dist.s0)(),location=(0,dist.TH)(),isMobile=(0,getIsMobile.W)();return(0,jsx_runtime.jsx)(Nav,{$isMobile:isMobile,children:(0,jsx_runtime.jsxs)(MenuContainer,{$isMobile:isMobile,children:[!isMobile&&(0,jsx_runtime.jsxs)(MenuLink,{to:routes.y.TEAM_OVERVIEW,children:[(0,jsx_runtime.jsx)(svg.tv,{}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",children:"모아보기"})]}),(0,jsx_runtime.jsxs)(MenuLink,{to:routes.y.TEAM_CALENDAR,children:[(0,jsx_runtime.jsx)(svg.Qu,{}),!isMobile&&(0,jsx_runtime.jsx)(Text.Z,{as:"span",children:"캘린더"})]}),(0,jsx_runtime.jsxs)(MenuLink,{to:routes.y.TEAM_FEED,children:[(0,jsx_runtime.jsx)(svg.Jw,{}),!isMobile&&(0,jsx_runtime.jsx)(Text.Z,{as:"span",children:"채팅"})]}),(0,jsx_runtime.jsxs)(MenuLink,{to:routes.y.TEAM_LINK,children:[(0,jsx_runtime.jsx)(svg.fq,{}),!isMobile&&(0,jsx_runtime.jsx)(Text.Z,{as:"span",children:"링크"})]}),(0,jsx_runtime.jsxs)(Button.Z,{type:"button",variant:"plain",css:teamAddButton,onClick:()=>{navigate(routes.y.START,{state:{from:location}})},children:[(0,jsx_runtime.jsx)(svg.Vc,{}),!isMobile&&(0,jsx_runtime.jsx)(Text.Z,{as:"span",css:teamAddText,children:"팀 참가/개설"})]})]})})};NavigationBar.displayName="NavigationBar";const NavigationBar_stories={title:"common/NavigationBar",component:NavigationBar,tags:["autodocs"]},Default={args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/routes.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>PATH_NAME});const PATH_NAME={LANDING:"/",POLICY:"/policy",LOGIN:"/login",START:"/start",JOIN:"/join",CREATE:"/create",TEAM_SELECT:"/team",TEAM_OVERVIEW:"/team/overview",TEAM_CALENDAR:"/team/calendar",TEAM_FEED:"/team/feed",TEAM_LINK:"/team/link"}},"./src/utils/getIsMobile.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>getIsMobile});const getIsMobile=()=>{const isIos=null!==window.navigator.userAgent.match(/ipad|iphone/i),isAndroid=null!==window.navigator.userAgent.match(/Android/i);return!(!isIos&&!isAndroid)}}}]);
//# sourceMappingURL=components-common-NavigationBar-NavigationBar-stories.89b0f117.iframe.bundle.js.map