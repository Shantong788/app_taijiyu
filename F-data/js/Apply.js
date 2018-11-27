//----------获取本地存储数据-----------
			
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
		var i_cookies= localStorage.cookies;
		var i_fish_id = localStorage.fish_id;
		var i_groupId = localStorage.groupId;
		var i_type = localStorage.type;
		var i_per_id = localStorage.per_id;
		
	} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
		var i_cookies= sessionStorage.cookies;
		var i_fish_id = sessionStorage.fish_id;
		var i_groupId = sessionStorage.groupId;
		var i_type = sessionStorage.type;
		var i_per_id = sessionStorage.per_id;
	}
	//判断时间
	function otime(times){
		var tt = new Date(times);
		var day = tt.getDate()<10?'0'+tt.getDate():tt.getDate();
		var hou = tt.getHours()<10?'0'+tt.getHours():tt.getHours();
		var min = tt.getMinutes()<10?'0'+tt.getMinutes():tt.getMinutes();
		var str = tt.getFullYear() + "年"+tt.getMonth()+1 +"月"+day+"日 "+hou+":"+min ;
		return str;
	}
//------------------同意--------------------
//获取数据
	var urlIds = window.location.href.split("=");
	var urlId = urlIds[1];
//判断是否已经同意
	var userId;
	$.ajax({
		type:"GET",
		url: "http://47.92.96.194:8000/community/message/list/"+i_fish_id+"?pageNum="+1,
       	crossDomain: true,
		dataType: 'json',
		beforeSend: function(res){
			document.cookie = i_cookies+";path=/";
		},
		xhrFields:{
         	withCredentials: true
       	},
		success: function(data) {
			console.log(data)
			var data = data.data;
			for(var i = 0; i<data.length; i++){
				if (urlId == data[i].id) {
					$('.write').html(data[i].userName);
					$('.userpic').attr('src',data[i].userHeadPic);
					$('.group_name').html(data[i].communityName);
					$('.times').html(otime(data[i].createTime));
					userId = data[i].userid;
					if (data[i].content == null) {
						$('.txt').hide()
					}else{
						$('.txt').html(data[i].content);
					}
					return;
					if (data[i].status == 0) {
						$('.button').css({"display":"block"})
					}else{
						$('.button').css({"display":"none"})
					}
				}
			}
		},
		error: function(xhr, error, ex) {
			console.log("网络有问题！！！");
		}
	});
	
	$('.y').on('click',function(){
		$.ajax({
			type:"POST",
			url: "http://47.92.96.194:8000/community/apply/success",
	       	crossDomain: true,
	       	data:{
	       		applyId:userId
	       	},
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
				if(data == null){
					return;
				}
			},
			error: function(xhr, error, ex) {
				console.log("网络有问题！！！");
			}
		});
	});
//------------------拒绝--------------------
	$('.z').on('click',function(){
		$.ajax({
			type:"POST",
			url: "http://47.92.96.194:8000/community/apply/fail",
	       	crossDomain: true,
	       	data:{
	       		applyId:userId
	       	},
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
				if(data == null){
					return;
				}
			},
			error: function(xhr, error, ex) {
				console.log("网络有问题！！！");
			}
		});
	});