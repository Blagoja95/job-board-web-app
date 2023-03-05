import Window from "./sections/Window";
import ReactDOM from 'react-dom/client';

export const openMail = (mail)  => {

    window.location.href = 'mailto:' + mail;
  };

export const closeWindow = () => {
  document.querySelector('#window').remove();
};

export const openWindow = (content) => {
  const forWin = ReactDOM.createRoot(document.getElementById('forWindow'));

  forWin.render(<Window content={content}/>)
};