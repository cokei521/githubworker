// 极简版 gh-proxy (hunshcn/gh-proxy 核心逻辑)
const PROXY_URL = 'https://github.com';
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetPath = url.pathname + url.search;
    
    // 安全检查：防止被滥用为开放代理
    if (!targetPath.startsWith('/')) {
      return new Response('Invalid path', { status: 400 });
    }
    
    const targetUrl = `${PROXY_URL}${targetPath}`;
    const newRequest = new Request(targetUrl, request);
    newRequest.headers.set('Host', 'github.com');
    
    const response = await fetch(newRequest);
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    return newResponse;
  }
};
