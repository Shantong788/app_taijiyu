
//判断调用方法
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
	localStorage.removeItem("cookies");
	localStorage.removeItem("fish_id");
	localStorage.removeItem("groupId");
	localStorage.removeItem("type");
	localStorage.removeItem("per_id");
	localStorage.removeItem("i_num_time");
	localStorage.removeItem("member_type");
	window.onload = iOSCookies();
} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
	if (sessionStorage.cookies == undefined && sessionStorage.fish_id == undefined) {
//		window.onload = window.hello.showAndroid();
	}else{
		var i_cookies= sessionStorage.cookies;
		var i_fish_id = sessionStorage.fish_id;
		var i_groupId = sessionStorage.groupId;
		var i_type = sessionStorage.type;
		var i_per_id = sessionStorage.per_id;
		Data(i_cookies,i_fish_id,i_groupId,i_type,i_per_id);
	}
   
}
$('.returns').on('click',function(){
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
		localStorage.removeItem("cookies");
		localStorage.removeItem("fish_id");
		localStorage.removeItem("groupId");
		localStorage.removeItem("type");
		localStorage.removeItem("per_id");
		localStorage.removeItem("i_num_time");
		iOSBack();
	} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
	    window.hello.showFish();
	}
})
//判断鱼王/鱼后
//			$('.king_img').on('click',function(){
//				window.location.href='set_king.html?t=1'
//			})
//			$('.queen_img img').on('click',function(){
//				window.location.href='set_king.html?t=2'
//			})
//线上环境数据
//Data('yiyu_sid=d0baa531-ad71-427d-a2ab-974eb7757129',"5a55bf912caaf729985bb7ed",'33762405580802',"新闻资讯",11)
function Data(cookies,fish_id,groupId,type,per_id){
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
		var storage=window.localStorage;
		storage.setItem("cookies",cookies);
		storage.setItem("fish_id",fish_id);
		storage.setItem("groupId",groupId);
		storage.setItem("type",type);
		storage.setItem("per_id",per_id);
		var i_cookies= localStorage.cookies;
		var i_fish_id = localStorage.fish_id;
		var i_groupId = localStorage.groupId;
		var i_type = localStorage.type;
		var i_per_id = localStorage.per_id;
		
	} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
		var storage=window.sessionStorage;
		storage.setItem("cookies",cookies);
		storage.setItem("fish_id",fish_id);
		storage.setItem("groupId",groupId);
		storage.setItem("type",type);
		storage.setItem("per_id",per_id);
		var i_cookies= sessionStorage.cookies;
		var i_fish_id = sessionStorage.fish_id;
		var i_groupId = sessionStorage.groupId;
		var i_type = sessionStorage.type;
		var i_per_id = sessionStorage.per_id;
	}
	$('.group_info>span').html(i_type);
	var member_type;
	
	//判断是否有信息通知
	function notice(){
		$.ajax({
			type:"GET",
			url: "http://47.92.96.194:8000/community/message/list/"+i_fish_id+"?pageNum=1",
	       	crossDomain: true,
			dataType: 'json',
			beforeSend: function(res){
				document.cookie = i_cookies+";path=/";
			},
			xhrFields:{
	         	withCredentials: true
	       	},
			success: function(data) {
				if(data.code != 1000){
					return;
				}else{
					var data = data.data;
					for(var i = 0; i<data.length; i++){
						if (data[i].status == 0) {
							$('.news img').attr('src','../img/notice3.png');
							break;
						}
					}
				}
			},
			error: function(xhr, error, ex) {
				console.log("网络有问题！！！");
			}
		});
	}
	
	//获取鱼群信息
	$.ajax({
		type:"GET",
		url: "http://47.92.96.194:8000/community/info/"+i_fish_id,
       	crossDomain: true,
		dataType: 'json',
		beforeSend: function(res){
			document.cookie = i_cookies+";path=/";
		},
		xhrFields: {
         	withCredentials: true
       	},
		success: function(data) {
			console.log(data)
			var data = data.data;
			(data.kingV != null)?$('.king>li img').attr('src',data.kingV.headPic):$('.king>li img').attr('src','../img/添加 (1).png');
			(data.queenV != null)?$('.Queen>li img').attr('src',data.queenV.headPic):$('.Queen>li img').attr('src','../img/添加 (1).png');
			if(i_per_id == data.userTopicCountVO.id){
				member_type = 1;
				$('.I_member').hide();
				$('.I_user').hide();
				$('.I_group').css({'display':'flex'});
				$('.group_head .I_group').css({'display':'flex'});
				notice();
			}else if(data.auth == 1){
				member_type = 2;
				$('.I_member').hide();
				$('.I_user').hide();
				$('.I_group').css({'display':'flex'});
				$('.group_head .I_group').css({'display':'flex'});
				$('.admin_1').hide();
				$('.admin_2').css({'display':'flex'});
				notice();
			}else{
				member_type = 3;
				$('.I_group').css({'display':'none'});
				$('.group_head .I_group').css({'display':'none'});
				$('.I_member').css({'display':'flex'});
				$('.I_user').css({'display':'flex'});
			}
				$('.group_head>span').append('<img src="'+data.showimg+'"/>');
				$('.group_info p:eq(0) span:eq(0)').html(data.name);
				$('.group_info p:eq(1) span:eq(1)').html(data.topicCount);
				$('.group_info p:eq(1) span:eq(0)').html(data.hots);
				$('.group_info p:eq(0) span:eq(1)').html(data.level);
			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
				localStorage.setItem("member_type",member_type);
				
			} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
				sessionStorage.setItem("member_type",member_type);
			};
			//判断鱼王/鱼后
			$('.king_img').on('click',function(){
				if(i_per_id != data.userTopicCountVO.id){
					mui.toast('只有群主有权限');
				}else{
					if(data.kingV == null || i_per_id!=data.kingV.id){
						window.location.href='set_king.html?t=1'
					}else if (i_per_id == data.kingV.id) {
						mui.toast('跳到主页');
					}
				}
			})
			$('.queen_img img').on('click',function(){
				if(i_per_id != data.userTopicCountVO.id){
					mui.toast('只有群主有权限');
				}
				else{
					if(data.queenV == null || i_per_id != data.queenV.id){
						window.location.href='set_king.html?t=2';
					}else if (i_per_id == data.queenV.id) {
						mui.toast('跳到主页');
					}
				}
			})
		},
		error: function(xhr, error, ex) {
			console.log("网络有问题！！！");
		}
	});
	//获取成员列表
	$.ajax({
		type:"POST",
		url: "http://47.92.96.194:8000/friends/groupMembers",
		data:{
			"groupId":i_groupId
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
			console.log(data)
			if (data == null) {
				$('.firend_num').html(0);
				return;
			}else{
				$('.firend_num').html(data.length)
				if (data.length<5) {
					for (var i = 0; i<data.length; i++) {
						$('.group_firend').append('<li><img src="'+ data[i].headPic +'" alt="" /></li>')
					}
					return;
				}else{
					for (var i = 0; i<5; i++) {
						$('.group_firend').append('<li><img src="'+ data[i].headPic +'" alt="" /></li>')
					}
					return;
				}
			}
		},
		error: function(xhr, error, ex) {
			console.log(ex);
		}
	});
	//获取管理员列表
	$.ajax({
		type:"POST",
		url: "http://47.92.96.194:8000/friends/adminList",
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
			console.log(data);
			if(data == null){
				$('.admin_num').html(0);
				return;
			}else{
				$('.admin_num').html(data.length)
				if (data.length<4) {
					for (var i = 0; i<data.length; i++) {
						$('.group_admin').append('<li><img src="'+ data[i].headPic +'" alt="" /></li>')
					}
				}else{
					for (var i = 0; i<4; i++) {
						$('.group_admin').append('<li><img src="'+ data[i].headPic +'" alt="" /></li>')
					}
				}
			}
		},
		error: function(xhr, error, ex) {
			console.log("网络有问题！！！");
		}
	});
	//添加鱼王雨后
	
	
	//点击退出鱼群
	$('.sign_out').on('click',function(){
		$.ajax({
		type:"POST",
		url: "http://47.92.96.194:8000/community/exit",
		data:{
			"communityId":i_fish_id
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
			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
				localStorage.removeItem("cookies");
				localStorage.removeItem("fish_id");
				localStorage.removeItem("groupId");
				localStorage.removeItem("type");
				localStorage.removeItem("per_id");
				localStorage.removeItem("i_num_time");
				localStorage.removeItem("member_type");
				iOSBack();
			} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
				window.hello.showFish();
			   
			}
		},
		error: function(xhr, error, ex) {
			console.log(ex);
		}
	});
	})
}
	
	
	












