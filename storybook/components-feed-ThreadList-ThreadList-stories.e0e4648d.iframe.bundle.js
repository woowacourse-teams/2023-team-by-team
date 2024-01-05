"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[546],{"./src/components/feed/ThreadList/ThreadList.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ThreadList_stories});var react=__webpack_require__("./node_modules/react/index.js"),Thread=__webpack_require__("./src/components/feed/Thread/Thread.tsx"),EmptyFeedPlaceholder=__webpack_require__("./src/components/feed/EmptyFeedPlaceholder/EmptyFeedPlaceholder.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),queryObserver=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/queryObserver.mjs"),infiniteQueryBehavior=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs");class InfiniteQueryObserver extends queryObserver.z{constructor(client,options){super(client,options)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(options,notifyOptions){super.setOptions({...options,behavior:(0,infiniteQueryBehavior.Gm)()},notifyOptions)}getOptimisticResult(options){return options.behavior=(0,infiniteQueryBehavior.Gm)(),super.getOptimisticResult(options)}fetchNextPage({pageParam,...options}={}){return this.fetch({...options,meta:{fetchMore:{direction:"forward",pageParam}}})}fetchPreviousPage({pageParam,...options}={}){return this.fetch({...options,meta:{fetchMore:{direction:"backward",pageParam}}})}createResult(query,options){var _state$fetchMeta,_state$fetchMeta$fetc,_state$fetchMeta2,_state$fetchMeta2$fet,_state$data,_state$data2;const{state}=query,result=super.createResult(query,options),{isFetching,isRefetching}=result,isFetchingNextPage=isFetching&&"forward"===(null==(_state$fetchMeta=state.fetchMeta)||null==(_state$fetchMeta$fetc=_state$fetchMeta.fetchMore)?void 0:_state$fetchMeta$fetc.direction),isFetchingPreviousPage=isFetching&&"backward"===(null==(_state$fetchMeta2=state.fetchMeta)||null==(_state$fetchMeta2$fet=_state$fetchMeta2.fetchMore)?void 0:_state$fetchMeta2$fet.direction);return{...result,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:(0,infiniteQueryBehavior.Qy)(options,null==(_state$data=state.data)?void 0:_state$data.pages),hasPreviousPage:(0,infiniteQueryBehavior.ZF)(options,null==(_state$data2=state.data)?void 0:_state$data2.pages),isFetchingNextPage,isFetchingPreviousPage,isRefetching:isRefetching&&!isFetchingNextPage&&!isFetchingPreviousPage}}}var useBaseQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useBaseQuery.mjs");var apis_http=__webpack_require__("./src/apis/http.ts"),feed=__webpack_require__("./src/constants/feed.ts");var query=__webpack_require__("./src/constants/query.ts");const useFetchThreads=teamPlaceId=>{const{data:threadPages,hasNextPage,fetchNextPage}=function useInfiniteQuery(arg1,arg2,arg3){const options=(0,utils._v)(arg1,arg2,arg3);return(0,useBaseQuery.r)(options,InfiniteQueryObserver)}(["threadData",teamPlaceId],(({pageParam})=>((teamPlaceId,lastThreadId)=>{const query=lastThreadId?`last-thread-id=${lastThreadId}&size=${feed.Yz}`:`size=${feed.Yz}`;return apis_http.d.get(`/api/team-place/${teamPlaceId}/feed/threads?${query}`)})(teamPlaceId,pageParam)),{enabled:teamPlaceId>0,getNextPageParam:lastPage=>{if(lastPage.threads.length===feed.Yz)return lastPage.threads[feed.Yz-1].id},staleTime:query.i.TEAM_FEED});return{threadPages,hasNextPage,fetchNextPage}};var useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts");const lastThreadText=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").iv`
  display: flex;
  align-self: center;

  font-weight: 600;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ThreadList=props=>{const{containerRef,size="md",onClickImage,isShowScrollBottomButton=!1}=props,{teamPlaceId}=(0,useTeamPlace.l)(),{threadPages,hasNextPage,fetchNextPage}=useFetchThreads(teamPlaceId),threadEndRef=(0,react.useRef)(null),observeRef=(0,react.useRef)(null),[scrollHeight,setScrollHeight]=(0,react.useState)(0);return((targetRef,onIntersect,hasNextPage)=>{const observer=(0,react.useRef)();(0,react.useEffect)((()=>{if(targetRef&&targetRef.current){if(observer.current=new IntersectionObserver(onIntersect,{root:null,rootMargin:"0px",threshold:1}),!hasNextPage)return void observer.current?.unobserve(targetRef.current);observer.current.observe(targetRef.current)}return()=>observer&&observer.current?.disconnect()}),[targetRef,onIntersect])})(observeRef,(([entry])=>{entry.isIntersecting&&teamPlaceId>0&&fetchNextPage()}),hasNextPage),(0,react.useEffect)((()=>{if(containerRef&&containerRef.current){const scrollTop=containerRef.current.scrollHeight-scrollHeight;containerRef.current.scrollTop=scrollTop,setScrollHeight(containerRef.current.scrollHeight)}}),[threadPages?.pages.length]),(0,react.useEffect)((()=>{threadEndRef.current&&threadEndRef.current.scrollIntoView()}),[teamPlaceId]),(0,react.useEffect)((()=>{threadEndRef.current&&(isShowScrollBottomButton||threadEndRef.current.scrollIntoView())}),[threadPages?.pages[0].threads.length]),(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("div",{ref:observeRef}),!hasNextPage&&threadPages&&threadPages.pages[0].threads.length>0&&(0,jsx_runtime.jsx)(Text.Z,{size:"lg",css:lastThreadText,children:"마지막 채팅 입니다."}),threadPages?.pages.slice().reverse().map((page=>page.threads.slice().reverse().map(((thread,index,threads)=>{const{id,type,profileImageUrl,content,authorId,...rest}=thread,isContinue=index-1>=0&&authorId===threads[index-1].authorId;return type===feed.KD.THREAD?(0,jsx_runtime.jsx)(Thread.Z,{threadSize:size,profileImageUrl,content,isContinue,onClickImage,...rest},id):null})))),(0,jsx_runtime.jsx)("div",{ref:threadEndRef}),threadPages&&0===threadPages.pages[0].threads.length&&(0,jsx_runtime.jsx)(EmptyFeedPlaceholder.Z,{})]})},ThreadList_ThreadList=ThreadList;try{ThreadList.displayName="ThreadList",ThreadList.__docgenInfo={description:"",displayName:"ThreadList",props:{containerRef:{defaultValue:null,description:"",name:"containerRef",required:!1,type:{name:"RefObject<HTMLDivElement>"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClickImage:{defaultValue:null,description:"",name:"onClickImage",required:!0,type:{name:"(images: ThreadImage[], selectedImage: number) => void"}},isShowScrollBottomButton:{defaultValue:null,description:"",name:"isShowScrollBottomButton",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThreadList/ThreadList.tsx#ThreadList"]={docgenInfo:ThreadList.__docgenInfo,name:"ThreadList",path:"src/components/feed/ThreadList/ThreadList.tsx#ThreadList"})}catch(__react_docgen_typescript_loader_error){}const ThreadList_stories={title:"Feed/ThreadList",component:ThreadList_ThreadList,tags:["autodocs"]},Default={args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/assets/png/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{WG:()=>feed_empty_image_namespaceObject,Rs:()=>link_empty_image_namespaceObject,Ok:()=>mouse_pointer_namespaceObject,Ep:()=>notice_thread_background_namespaceObject,wp:()=>thumbnail_fallback_image_namespaceObject});const notice_thread_background_namespaceObject=__webpack_require__.p+"static/media/notice-thread-background.48ca8103.png",link_empty_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/link-empty-image.5fc72217.png"),feed_empty_image_namespaceObject=__webpack_require__.p+"static/media/feed-empty-image.0ca39879.png",mouse_pointer_namespaceObject=__webpack_require__.p+"static/media/mouse-pointer.0c55151b.png",thumbnail_fallback_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/thumbnail-fallback-image.c23bee9d.png")},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>DeletableThumbnail_DeletableThumbnail});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.li`
  display: inline-block;
  flex-shrink: 0;
  position: relative;

  width: 96px;
  height: 96px;

  border-radius: 12px;
`,Image=styled_components_browser_esm.zo.img`
  width: 100%;
  height: 100%;

  border-radius: 12px;

  object-fit: cover;
`,deleteButton=styled_components_browser_esm.iv`
  position: absolute;
  top: -4px;
  right: -4px;

  width: 24px;
  height: 24px;
  padding: 0;

  border-radius: 4px;
  box-shadow: 0 3px 6px ${({theme})=>theme.color.GRAY400};
  background-color: ${({theme})=>theme.color.GRAY100};

  & svg {
    width: 18px;
    height: 18px;
  }
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),png=__webpack_require__("./src/assets/png/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DeletableThumbnail=props=>{const{image,onDelete,isUploading}=props,{uuid,url}=image;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Image,{src:url,alt:"미리보기 이미지",onError:e=>{e.currentTarget.src=png.wp,e.currentTarget.alt="손상된 이미지"}}),!isUploading&&(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:deleteButton,onClick:()=>onDelete(uuid),"aria-label":`${url} 이미지 삭제하기`,children:(0,jsx_runtime.jsx)(svg.gH,{})})]})};DeletableThumbnail.displayName="DeletableThumbnail";const DeletableThumbnail_DeletableThumbnail=DeletableThumbnail;try{DeletableThumbnail.displayName="DeletableThumbnail",DeletableThumbnail.__docgenInfo={description:"",displayName:"DeletableThumbnail",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"PreviewImage"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!0,type:{name:"(imageUuid: string) => void"}},isUploading:{defaultValue:null,description:"",name:"isUploading",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx#DeletableThumbnail"]={docgenInfo:DeletableThumbnail.__docgenInfo,name:"DeletableThumbnail",path:"src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx#DeletableThumbnail"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/EmptyFeedPlaceholder/EmptyFeedPlaceholder.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>EmptyFeedPlaceholder_EmptyFeedPlaceholder});var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),png=__webpack_require__("./src/assets/png/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`,PlaceholderContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 18px;

  width: 380px;
`,FeedEmptyImage=styled_components_browser_esm.zo.img`
  width: 18%;
  margin-bottom: 10px;
`,titleText=styled_components_browser_esm.iv`
  font-size: 28px;
  color: ${({theme})=>theme.color.GRAY400};
`;styled_components_browser_esm.iv`
  font-size: 20px;
  color: ${({theme})=>theme.color.GRAY500};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const EmptyFeedPlaceholder=()=>(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsxs)(PlaceholderContainer,{children:[(0,jsx_runtime.jsx)(FeedEmptyImage,{src:png.WG,alt:"비어있는 피드 이미지"}),(0,jsx_runtime.jsx)(Text.Z,{weight:"bold",css:titleText,children:"대화를 시작해 보세요!"})]})});EmptyFeedPlaceholder.displayName="EmptyFeedPlaceholder";const EmptyFeedPlaceholder_EmptyFeedPlaceholder=EmptyFeedPlaceholder},"./src/components/feed/ImageAddButton/ImageAddButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ImageAddButton_ImageAddButton});var svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const FakeButton=styled_components_browser_esm.zo.div`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ImageAddButton=props=>{const{onChangeImage}=props;return(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(FakeButton,{role:"button","aria-label":"이미지 추가",children:(0,jsx_runtime.jsx)(svg.pO,{})}),(0,jsx_runtime.jsx)(FileUploadInput,{type:"file",accept:"image/*",onChange:onChangeImage,multiple:!0})]})};ImageAddButton.displayName="ImageAddButton";const ImageAddButton_ImageAddButton=ImageAddButton;try{ImageAddButton.displayName="ImageAddButton",ImageAddButton.__docgenInfo={description:"",displayName:"ImageAddButton",props:{onChangeImage:{defaultValue:null,description:"",name:"onChangeImage",required:!0,type:{name:"(e: ChangeEvent<HTMLInputElement>) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ImageAddButton/ImageAddButton.tsx#ImageAddButton"]={docgenInfo:ImageAddButton.__docgenInfo,name:"ImageAddButton",path:"src/components/feed/ImageAddButton/ImageAddButton.tsx#ImageAddButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/Thread/Thread.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Thread_Thread});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 10px;

  z-index: 0;
`,BodyContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: flex-end;

  gap: 10px;

  ${({$isMe})=>$isMe&&"flex-direction: row-reverse"};
`,ContentContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;

  max-width: 80%;
  max-height: ${({$height})=>$height}px;

  ${({$isMe,theme})=>$isMe?styled_components_browser_esm.iv`
        background-color: ${theme.color.PRIMARY900};
        border-radius: 12px 12px 0 12px;
      `:styled_components_browser_esm.iv`
      background-color: ${theme.color.GRAY150};
      border-radius: 0 12px 12px 12px;
    `}

  transition: 0.3s;
`,ContentWrapper=styled_components_browser_esm.zo.div`
  position: relative;
  overflow: hidden;

  padding: 10px 24px;
`,ThreadHeader=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  height: 36px;
`,Author=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,ProfileImg=styled_components_browser_esm.zo.img`
  width: 30px;
  height: 30px;

  border-radius: 50%;

  object-fit: cover;
`,ThumbnailListWrapper=styled_components_browser_esm.zo.div`
  width: 100%;
  height: 136px;
  padding: 40px 20px 0 20px;
  margin-top: -20px;
  margin-bottom: ${({$marginBottom})=>$marginBottom?"30px":"10px"};

  background: ${({theme,$isMe})=>$isMe?theme.gradient.BLURPLE("116px"):theme.gradient.WHITE("116px")};

  z-index: 1;
  box-sizing: border-box;
`,threadInfoText=styled_components_browser_esm.iv`
  white-space: pre-wrap;

  font-size: 14px;
  color: ${({theme})=>theme.color.BLACK};
`,contentField=(threadSize,isMe)=>styled_components_browser_esm.iv`
  width: 100%;
  white-space: pre-wrap;

  font-size: ${"md"===threadSize?16:14}px;
  color: ${({theme})=>isMe?theme.color.WHITE:theme.color.BLACK};

  word-break: break-all;
`;var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),formatWriteTime=__webpack_require__("./src/utils/formatWriteTime.ts"),react=__webpack_require__("./node_modules/react/index.js"),feed=__webpack_require__("./src/constants/feed.ts");var ThreadExpandButton=__webpack_require__("./src/components/feed/ThreadExpandButton/ThreadExpandButton.tsx"),ThumbnailList=__webpack_require__("./src/components/feed/ThumbnailList/ThumbnailList.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Thread=props=>{const{threadSize="md",authorName,profileImageUrl,isMe=!1,createdAt,content,images,isContinue,onClickImage}=props,createdTime=(0,formatWriteTime.o)(createdAt).split(" ").join("\n"),threadRef=(0,react.useRef)(null),contentRef=(0,react.useRef)(null),{shouldShowExpandButton,isExpanded,toggleExpanded,resultHeight}=((threadRef,contentRef)=>{const[threadHeight,setThreadHeight]=(0,react.useState)(0),[contentHeight,setContentHeight]=(0,react.useState)(0),[isExpanded,setExpanded]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{if(!threadRef.current||!contentRef.current)return;const resizeObserver=new ResizeObserver((()=>{setThreadHeight((()=>threadRef.current?threadRef.current.clientHeight:0)),setContentHeight((()=>contentRef.current?contentRef.current.clientHeight:0))}));return resizeObserver.observe(threadRef.current),resizeObserver.observe(contentRef.current),()=>resizeObserver.disconnect()}),[contentRef,threadRef]),{shouldShowExpandButton:threadHeight>=feed.rW,isExpanded,toggleExpanded:()=>{setExpanded((prev=>!prev))},resultHeight:isExpanded?contentHeight+250:feed.rW}})(threadRef,contentRef);return(0,jsx_runtime.jsxs)(Container,{$isMe:isMe,children:[!isMe&&!isContinue&&(0,jsx_runtime.jsx)(ThreadHeader,{children:(0,jsx_runtime.jsxs)(Author,{children:[(0,jsx_runtime.jsx)(ProfileImg,{src:profileImageUrl,alt:authorName}),(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",css:threadInfoText,children:authorName})]})}),(0,jsx_runtime.jsxs)(BodyContainer,{$isMe:isMe,children:[(0,jsx_runtime.jsxs)(ContentContainer,{$isMe:isMe,ref:threadRef,$height:resultHeight,children:[(0,jsx_runtime.jsx)(ContentWrapper,{children:(0,jsx_runtime.jsx)("div",{ref:contentRef,children:(0,jsx_runtime.jsx)(Text.Z,{css:contentField(threadSize,isMe),children:content})})}),images.length>0&&(0,jsx_runtime.jsx)(ThumbnailListWrapper,{$isMe:isMe,$marginBottom:!shouldShowExpandButton,children:(0,jsx_runtime.jsx)(ThumbnailList.Z,{mode:"view",images,onClick:onClickImage})}),shouldShowExpandButton&&(0,jsx_runtime.jsx)(ThreadExpandButton.Z,{isExpanded,isMe,size:threadSize,onClick:toggleExpanded})]}),(0,jsx_runtime.jsx)("time",{children:(0,jsx_runtime.jsx)(Text.Z,{css:threadInfoText,children:createdTime})})]})]})};Thread.displayName="Thread";const Thread_Thread=Thread;try{Thread.displayName="Thread",Thread.__docgenInfo={description:"",displayName:"Thread",props:{threadSize:{defaultValue:null,description:"",name:"threadSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},authorName:{defaultValue:null,description:"",name:"authorName",required:!0,type:{name:"string"}},profileImageUrl:{defaultValue:null,description:"",name:"profileImageUrl",required:!0,type:{name:"string"}},isMe:{defaultValue:null,description:"",name:"isMe",required:!1,type:{name:"boolean"}},createdAt:{defaultValue:null,description:"",name:"createdAt",required:!0,type:{name:"`${string}-${string}-${string} ${string}:${string}`"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}},images:{defaultValue:null,description:"",name:"images",required:!0,type:{name:"ThreadImage[]"}},isContinue:{defaultValue:null,description:"",name:"isContinue",required:!0,type:{name:"boolean"}},onClickImage:{defaultValue:null,description:"",name:"onClickImage",required:!0,type:{name:"(images: ThreadImage[], selectedImage: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/Thread/Thread.tsx#Thread"]={docgenInfo:Thread.__docgenInfo,name:"Thread",path:"src/components/feed/Thread/Thread.tsx#Thread"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ThreadExpandButton/ThreadExpandButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ThreadExpandButton_ThreadExpandButton});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
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
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ThreadExpandButton=props=>{const{isExpanded,isMe=!1,size="md",onClick}=props;return(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",css:expandButton(isMe,size),onClick,children:(0,jsx_runtime.jsx)(Container,{children:isExpanded?(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",size:"md"===size?"lg":"md",children:"접기"}),(0,jsx_runtime.jsx)(svg.j_,{})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",size:"md"===size?"lg":"md",children:"더 보기"}),(0,jsx_runtime.jsx)(svg.gV,{})]})})})};ThreadExpandButton.displayName="ThreadExpandButton";const ThreadExpandButton_ThreadExpandButton=ThreadExpandButton;try{ThreadExpandButton.displayName="ThreadExpandButton",ThreadExpandButton.__docgenInfo={description:"",displayName:"ThreadExpandButton",props:{isExpanded:{defaultValue:null,description:"",name:"isExpanded",required:!0,type:{name:"boolean"}},isMe:{defaultValue:null,description:"",name:"isMe",required:!1,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThreadExpandButton/ThreadExpandButton.tsx#ThreadExpandButton"]={docgenInfo:ThreadExpandButton.__docgenInfo,name:"ThreadExpandButton",path:"src/components/feed/ThreadExpandButton/ThreadExpandButton.tsx#ThreadExpandButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ThumbnailList/ThumbnailList.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ThumbnailList_ThumbnailList});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  column-gap: 12px;

  width: 100%;

  ${({$mode,$size})=>"view"===$mode?"sm"===$size?styled_components_browser_esm.iv`
          overflow-x: auto;
          overflow-y: hidden;
        `:styled_components_browser_esm.iv`
          height: 116px;

          overflow-x: auto;
          overflow-y: hidden;

          padding-bottom: 20px;
        `:styled_components_browser_esm.iv`
        height: 116px;

        overflow-x: visible;
      `}
`;var DeletableThumbnail=__webpack_require__("./src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx"),ViewableThumbnail=__webpack_require__("./src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx"),ImageAddButton=__webpack_require__("./src/components/feed/ImageAddButton/ImageAddButton.tsx"),feed=__webpack_require__("./src/constants/feed.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ThumbnailList=props=>{const{mode,images}=props;return(0,jsx_runtime.jsxs)(Container,{role:"list",$mode:mode,$size:"view"===mode?props.size:void 0,children:["delete"===mode?images.map((image=>(0,jsx_runtime.jsx)(DeletableThumbnail.Z,{image,onDelete:props.onDelete,isUploading:props.isUploading},image.uuid))):images.map(((image,index)=>(0,jsx_runtime.jsx)(ViewableThumbnail.Z,{image,size:props.size,onClick:()=>props.onClick(images,index+1)},image.id))),"delete"===mode&&images.length<feed.vO&&!props.isUploading&&(0,jsx_runtime.jsx)(ImageAddButton.Z,{onChangeImage:props.onChange})]})};ThumbnailList.displayName="ThumbnailList";const ThumbnailList_ThumbnailList=ThumbnailList;try{ThumbnailList.displayName="ThumbnailList",ThumbnailList.__docgenInfo={description:"",displayName:"ThumbnailList",props:{mode:{defaultValue:null,description:"",name:"mode",required:!0,type:{name:"enum",value:[{value:'"view"'},{value:'"delete"'}]}},images:{defaultValue:null,description:"",name:"images",required:!0,type:{name:"PreviewImage[] | ThreadImage[]"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!0,type:{name:"(imageUuid: string) => void"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"ChangeEventHandler<HTMLInputElement>"}},isUploading:{defaultValue:null,description:"",name:"isUploading",required:!0,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"(images: ThreadImage[], selectedImage: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThumbnailList/ThumbnailList.tsx#ThumbnailList"]={docgenInfo:ThumbnailList.__docgenInfo,name:"ThumbnailList",path:"src/components/feed/ThumbnailList/ThumbnailList.tsx#ThumbnailList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ViewableThumbnail_ViewableThumbnail});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.li`
  flex-shrink: 0;

  width: ${({$size="md"})=>"md"===$size?"96px":"56px"};
  height: ${({$size="md"})=>"md"===$size?"96px":"56px"};

  border-radius: ${({$size="md"})=>"md"===$size?"12px":"10px"};
`,Image=styled_components_browser_esm.zo.img`
  width: 100%;
  height: 100%;

  border-radius: 12px;

  object-fit: cover;
`,viewButton=styled_components_browser_esm.iv`
  width: 100%;
  height: 100%;
  padding: 0;

  border-radius: 12px;
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),png=__webpack_require__("./src/assets/png/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ViewableThumbnail=props=>{const{image,size="md",onClick}=props,{isExpired,name,url}=image;return(0,jsx_runtime.jsx)(Container,{$size:size,children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:viewButton,onClick,"aria-label":`${name} 이미지 자세히 보기`,children:(0,jsx_runtime.jsx)(Image,{src:isExpired?png.wp:url,alt:name,onError:e=>{e.currentTarget.src=png.wp,e.currentTarget.alt="손상된 이미지"}})})})};ViewableThumbnail.displayName="ViewableThumbnail";const ViewableThumbnail_ViewableThumbnail=ViewableThumbnail;try{ViewableThumbnail.displayName="ViewableThumbnail",ViewableThumbnail.__docgenInfo={description:"",displayName:"ViewableThumbnail",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"ThreadImage"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx#ViewableThumbnail"]={docgenInfo:ViewableThumbnail.__docgenInfo,name:"ViewableThumbnail",path:"src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx#ViewableThumbnail"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/feed.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{KD:()=>THREAD_TYPE,Yz:()=>THREAD_SIZE,rW:()=>DEFAULT_MAX_THREAD_HEIGHT,vO:()=>MAX_UPLOAD_IMAGE_COUNT});const DEFAULT_MAX_THREAD_HEIGHT=500,THREAD_TYPE={THREAD:"thread",NOTIFICATION:"notification"},THREAD_SIZE=20,MAX_UPLOAD_IMAGE_COUNT=4},"./src/constants/query.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>STALE_TIME});const STALE_TIME={SCHEDULES:3e4,DAILY_SCHEDULES:3e4,MY_SCHEDULES:3e4,MY_DAILY_SCHEDULES:3e4,USER_INFO:3e5,TEAM_PLACE_MEMBERS:6e4,TEAM_PLACE_INVITE_CODE:1/0,TEAM_LINKS:6e4,TEAM_FEED:3e5,ICALENDAR_URL:1/0}},"./src/hooks/useTeamPlace.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>useTeamPlace});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/TeamPlaceContext.tsx");const useTeamPlace=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__.Q);if(void 0===context)throw new Error("useTeamPlace must be used within a TeamPlaceContext");return context}},"./src/utils/formatWriteTime.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>formatWriteTime});const formatWriteTime=rawDateTime=>rawDateTime.replaceAll("-","/")}}]);
//# sourceMappingURL=components-feed-ThreadList-ThreadList-stories.e0e4648d.iframe.bundle.js.map