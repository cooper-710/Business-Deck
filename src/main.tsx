
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  // #region agent log
  if (import.meta.hot) {
    console.log('[HMR] Hot Module Replacement is available');
    import.meta.hot.on('vite:beforeUpdate', (payload) => {
      console.log('[HMR] beforeUpdate event received', payload);
      fetch('http://127.0.0.1:7242/ingest/fb1a77d5-7e84-4ece-9db6-a8678e2655a7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:9',message:'HMR beforeUpdate event',data:{updates:payload.updates?.map(u=>({acceptedPath:u.acceptedPath,type:u.type}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    });
    import.meta.hot.on('vite:afterUpdate', (payload) => {
      console.log('[HMR] afterUpdate event received', payload);
      fetch('http://127.0.0.1:7242/ingest/fb1a77d5-7e84-4ece-9db6-a8678e2655a7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:14',message:'HMR afterUpdate event',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    });
    import.meta.hot.on('vite:error', (err) => {
      console.error('[HMR] Error:', err);
      fetch('http://127.0.0.1:7242/ingest/fb1a77d5-7e84-4ece-9db6-a8678e2655a7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:19',message:'HMR error event',data:{error:err.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    });
    fetch('http://127.0.0.1:7242/ingest/fb1a77d5-7e84-4ece-9db6-a8678e2655a7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:22',message:'HMR available check',data:{hmrAvailable:!!import.meta.hot},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  } else {
    console.warn('[HMR] Hot Module Replacement is NOT available');
    fetch('http://127.0.0.1:7242/ingest/fb1a77d5-7e84-4ece-9db6-a8678e2655a7',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:25',message:'HMR not available',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  }
  // #endregion

  createRoot(document.getElementById("root")!).render(<App />);
  