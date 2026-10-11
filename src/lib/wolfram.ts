const appid = "6AJEUQL935"

if (!appid) {
  throw new Error ("App ID could not be found in Environment")
}

export default async function query(input: string, output: 'xml' | 'json' = 'json', format:  "image" | "imagemap" | "plaintext" | "minput" | "moutput" | "cell" | "mathml" | "sound" | "wav" = 'mathml') {
  const url = new URL("https://api.wolframalpha.com/v2/query");

  url.searchParams.set("appid", appid);
  url.searchParams.set("input", input);
  url.searchParams.set("output", output);
  url.searchParams.set("format", format);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Calculator returned: ${response.status}`);
  }
  return output === 'xml' ?
    response.text() :
    response.json()
}
