// выводим fetch в отдельную функцию для отправки данных   
const postData = async (url, data) => {
   const res = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-type': 'application/json'
      },
      body: data
   });
   // возвращаем промис res в json формате 
   return await res.json();
};

async function getResource(ulr) {
   let res = await fetch(ulr);
   if (!res.ok) {
      throw new Error(`Could not fetch ${ulr}, status: ${res.status}`);
   }
   return await res.json();
}

export { postData };
export { getResource };