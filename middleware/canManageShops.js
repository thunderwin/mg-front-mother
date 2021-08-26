// 给 www.thousandcountry.com 用的
export default function({ app, redirect, req }) {
  let domain = app.store.state.domain;

  console.dir("domain");
  console.log(JSON.stringify(domain));

  if (domain !== "en-thousandcountry") {
     redirect('/err');
  }
}
