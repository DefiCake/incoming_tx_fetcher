export default async function (millis: number): Promise<void> {
  return await new Promise<void>((resolve) => {
    setTimeout(resolve, millis);
  });
}
