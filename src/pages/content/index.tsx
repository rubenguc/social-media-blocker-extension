import { createRoot } from "react-dom/client"
import Browser from "webextension-polyfill"
// import cheems from "./stop-cheems.png"

const injectMessageScreen = () => {
  document.body.innerHTML = ""

  const div = document.createElement('div');
  div.id = '__root';
  document.body.appendChild(div);
  const rootContainer = document.querySelector('#__root');
  if (!rootContainer) throw new Error("Can't find Options root element");
  const root = createRoot(rootContainer);

  // inject css
  const style = document.createElement('style');
  style.innerHTML = `
    html, body, #__root {
      height: 100%;
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `

  document.body.appendChild(style);

  // const rootPath = Browser.runtime.getURL('')

  root.render(

    <div >
      <p style={{
        fontSize: '2rem',
        fontWeight: 'bold',

      }}>

        Page blocked by extension
      </p>
      {/* <img src={`${rootPath}icon-128.png`} width={200} height={2000} alt="" /> */}
    </div>
  );
}



const init = async () => {
  try {
    const response = await Browser.runtime.sendMessage({
      message: 'get-blocked-social-medias-domains'
    })
    const blockedDomains = response.blockedDomains || []
    const host = window.location.host.split('.').slice(-2).join('.')
    const hostIsBlocked = blockedDomains.includes(host)

    if (hostIsBlocked) injectMessageScreen()
  } catch (error) {
    console.log(error)
  }

}

init()