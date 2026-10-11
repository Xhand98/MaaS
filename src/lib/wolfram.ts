const appid = process.env.APP_ID
if (!appid) {
  throw new Error ("App ID could not be found in Environment")
}

export default async function query(input: string, output: 'xml' | 'json' = 'json') {
  const url = new URL("https://api.wolframalpha.com/v2/query");

  url.searchParams.set("appid", appid);
  url.searchParams.set("input", input);
  url.searchParams.set("output", output);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Calculator returned: ${response.status}`);
  }
  return output === 'xml' ?
    response.text() :
    response.json()
}
