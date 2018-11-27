if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
	var i_cookies= localStorage.cookies;
	var i_fish_id = localStorage.fish_id;
	var i_groupId = localStorage.groupId;
	var i_type = localStorage.type;
} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
	var i_cookies= sessionStorage.cookies;
	var i_fish_id = sessionStorage.fish_id;
	var i_groupId = sessionStorage.groupId;
	var i_type = sessionStorage.type;
}
$(function(){
	$.ajax({
		type:"POST",
		url: "http://47.92.96.194:8000/friends/groupMembersFen",
		data:{
			'groupId':i_groupId
		},
		beforeSend: function(res){
			document.cookie = i_cookies+";path=/";
		},
		xhrFields: {
         	withCredentials: true
       	},
	   	crossDomain: true,
		dataType: 'json',
		success: function(data) {
			var data = data.data;
			if (data.length == 0) {
				$('.admin_num').html(0);
			}else{
				$('.admin_num').html(data.length);
			}
			for (var i = 0; i<data.length; i++) {
				$('.comment').append('<div class="member"><div class="box"><div class="portrait"><img src="'+data[i].headPic+'"/></div><div class="name">'+data[i].nickname+'</div><br /></div><div class="select"><img src="../img/选择.png" class="apple"/></div><input type="hidden" class="member_id" value="'+ data[i].id +'" /></div>')
			}
		},
		error: function(xhr, error, ex) {
			console.log("网络有问题！！！");
		}
	});
	$('.comment').on('click','.member',function(){
		$(this).siblings().children('.select').children('img').hide();
		$(this).addClass('member pitch_on');
		$(this).siblings().removeClass('pitch_on');
		$(this).children('.select').children('img').toggle();
	})
	$('.save').on('click',function(){
		var userIds = $('.pitch_on .member_id').val();
		if (userIds == undefined) {
			alert("请选中好友");
			return;
		}else{
			$.ajax({
				type:"POST",
				url: "http://47.92.96.194:8000/community/upAuth",
				data:{
					'communityId':i_fish_id,
					'userId':userIds
				},
				beforeSend: function(res){
					document.cookie = i_cookies+";path=/";
				},
				xhrFields: {
		         	withCredentials: true
		       	},
			   	crossDomain: true,
				dataType: 'json',
				success: function(data) {
					window.location.href="Admin.html"
				},
				error: function(xhr, error, ex) {
					console.log("网络有问题！！！");
				}
			});
		}
	})
})







