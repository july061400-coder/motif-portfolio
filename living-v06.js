'use strict';
// 시간/공간 선택은 연출 사진 비교이며 제품의 조광 기능 시연이 아니다.
const exportView=document.documentElement.classList.contains('export-view');
const timeButtons=[...document.querySelectorAll('[data-time]')];
timeButtons.forEach(button=>button.addEventListener('click',()=>{
 timeButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 document.querySelectorAll('.time-panel').forEach(panel=>{panel.hidden=panel.id!==`time-${button.dataset.time}`;});
}));
const roomTabs=[...document.querySelectorAll('[role="tab"]')];
function selectRoom(tab,focus=false){
 roomTabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active;});
 if(focus)tab.focus();
}
roomTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectRoom(tab));
 tab.addEventListener('keydown',event=>{
  let target;
  if(event.key==='ArrowRight')target=roomTabs[(index+1)%roomTabs.length];
  if(event.key==='ArrowLeft')target=roomTabs[(index-1+roomTabs.length)%roomTabs.length];
  if(event.key==='Home')target=roomTabs[0];
  if(event.key==='End')target=roomTabs[roomTabs.length-1];
  if(target){event.preventDefault();selectRoom(target,true);}
 });
});
if(exportView){
 document.querySelectorAll('details').forEach(item=>{item.open=true;});
 document.querySelectorAll('.time-panel,.room-panel').forEach(panel=>{panel.hidden=false;});
 document.querySelectorAll('img').forEach(img=>{img.loading='eager';});
}
