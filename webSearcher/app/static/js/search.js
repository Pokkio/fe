/**
 * Created by CLay on 2019/2/9.
 */
$.ajax({
   url: '/film',
    type: 'GET',
    data: JSON.stringify(data.field),
    contentType: 'application/json'
});
