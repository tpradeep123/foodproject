$(document).ready(function(){

    $.getJSON('/foodproject/fetch_all_foodtype',function(data){
    
        data.map((item)=>{
    
            $('#foodtype').append($('<option>').text(item.foodtype).val(item.foodid))
        })
    })
    
    
    $('#foodtype').change(function(){


        $.getJSON('/foodproject/fetch_all_fooditem',{foodid:$('#foodtype').val()},function(data){
   
   $('#fooditem').empty()
   $('#fooditem').append($('<option>').text('-select title-'))
   
   data.map((item)=>{
   
       $('#fooditem').append($('<option>').text(item.foodname).val(item.fooditemid))
   
        })
   
   
   
   
       })
   
   })
   
})