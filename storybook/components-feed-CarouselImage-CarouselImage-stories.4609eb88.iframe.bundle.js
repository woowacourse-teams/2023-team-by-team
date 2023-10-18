"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[838],{"./src/components/feed/CarouselImage/CarouselImage.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CorruptedImage:()=>CorruptedImage,Default:()=>Default,ExpiredImage:()=>ExpiredImage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _components_feed_CarouselImage_CarouselImage__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/feed/CarouselImage/CarouselImage.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"feed/CarouselImage",component:_components_feed_CarouselImage_CarouselImage__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"],decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{backgroundColor:"black",width:"100%",height:"500px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})})],argTypes:{image:{description:"컴포넌트에 표시할 이미지의 정보를 의미합니다. 유효하지 않은 이미지의 url이 주어져도 상관 없습니다."}},parameters:{docs:{description:{component:"`CarouselImage`는 `Carousel` 컴포넌트에 표시되는 하나의 이미지를 이루는 컴포넌트입니다. 이미지에 문제가 있어 표시할 수 없을 경우에는 관련된 오류 메시지를 대신 보여주게 됩니다."}}}},Default={args:{image:{id:9283,isExpired:!1,name:"neon.png",url:"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"}}},CorruptedImage={args:{image:{id:9834,isExpired:!1,name:"neon.png",url:"https://chicken-meokko-shipda.com/yangnium/ganjang/chicken.jpg"}}},ExpiredImage={args:{image:{id:4657,isExpired:!0,name:"neon.png",url:"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    image: {\n      id: 9283,\n      isExpired: false,\n      name: 'neon.png',\n      url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'\n    }\n  }\n}",...Default.parameters?.docs?.source}}},CorruptedImage.parameters={...CorruptedImage.parameters,docs:{...CorruptedImage.parameters?.docs,source:{originalSource:"{\n  args: {\n    image: {\n      id: 9834,\n      isExpired: false,\n      name: 'neon.png',\n      url: 'https://chicken-meokko-shipda.com/yangnium/ganjang/chicken.jpg'\n    }\n  }\n}",...CorruptedImage.parameters?.docs?.source},description:{story:"API 서버 측에서 이 이미지가 만료되었음을 명시하지 않았으나, 실제로 이미지를 로드한 결과 이미지의 url이 올바르지 않아 깨진 경우입니다.",...CorruptedImage.parameters?.docs?.description}}},ExpiredImage.parameters={...ExpiredImage.parameters,docs:{...ExpiredImage.parameters?.docs,source:{originalSource:"{\n  args: {\n    image: {\n      id: 4657,\n      isExpired: true,\n      name: 'neon.png',\n      url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'\n    }\n  }\n}",...ExpiredImage.parameters?.docs?.source},description:{story:"API 서버 측에서 이 이미지가 만료되었음을 명시한 경우입니다.",...ExpiredImage.parameters?.docs?.description}}};const __namedExportsOrder=["Default","CorruptedImage","ExpiredImage"];try{CorruptedImage.displayName="CorruptedImage",CorruptedImage.__docgenInfo={description:"API 서버 측에서 이 이미지가 만료되었음을 명시하지 않았으나, 실제로 이미지를 로드한 결과 이미지의 url이 올바르지 않아 깨진 경우입니다.",displayName:"CorruptedImage",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/CarouselImage/CarouselImage.stories.tsx#CorruptedImage"]={docgenInfo:CorruptedImage.__docgenInfo,name:"CorruptedImage",path:"src/components/feed/CarouselImage/CarouselImage.stories.tsx#CorruptedImage"})}catch(__react_docgen_typescript_loader_error){}try{ExpiredImage.displayName="ExpiredImage",ExpiredImage.__docgenInfo={description:"API 서버 측에서 이 이미지가 만료되었음을 명시한 경우입니다.",displayName:"ExpiredImage",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/CarouselImage/CarouselImage.stories.tsx#ExpiredImage"]={docgenInfo:ExpiredImage.__docgenInfo,name:"ExpiredImage",path:"src/components/feed/CarouselImage/CarouselImage.stories.tsx#ExpiredImage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/CarouselImage/CarouselImage.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CarouselImage_CarouselImage});var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 100%;

  width: 100%;
  height: 100%;
  padding: 0 100px;

  & > img {
    max-width: 100%;
    max-height: 100%;
  }
`,errorText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.WHITE};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const CarouselImage=props=>{const{image}=props,{isExpired,name,url}=image,[errorMessage,setErrorMessage]=(0,react.useState)(isExpired?"이 이미지는 기간이 만료되었습니다.":null);return(0,jsx_runtime.jsx)(Container,{children:errorMessage?(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"xxl",css:errorText,children:errorMessage}):(0,jsx_runtime.jsx)("img",{src:url,alt:name,onError:()=>setErrorMessage((()=>"이미지를 표시하는 데 실패했습니다.\n올바르지 않은 형식의 이미지거나, 이미지가 손상되었을 수 있습니다."))})})};CarouselImage.displayName="CarouselImage";const CarouselImage_CarouselImage=CarouselImage;try{CarouselImage.displayName="CarouselImage",CarouselImage.__docgenInfo={description:"",displayName:"CarouselImage",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"ThreadImage"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/CarouselImage/CarouselImage.tsx#CarouselImage"]={docgenInfo:CarouselImage.__docgenInfo,name:"CarouselImage",path:"src/components/feed/CarouselImage/CarouselImage.tsx#CarouselImage"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-feed-CarouselImage-CarouselImage-stories.4609eb88.iframe.bundle.js.map