
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
//alert(i_cookies);
var num = 2;
$('.added').click(function(){
	if (num>=6) {
		return;
	}else{
		num++;
		var str = `<ul>
						<li><img src="../img/ic_target.png"/></li>
						<input type="text" class="txt con" maxlength="10" value="" placeholder="投票选项(最多10个字)" maxlength="10"/>
						<span class="imgs"><img src="../img/差号.png" class="img-a"/></span>
					</ul>`;
		$('.added').animate({'margin-top':'0.9rem'},200,function(){
			$('.added').css({'margin-top':0})
			$('.vote_s').append(str);
			$('.imgs img').css('display','flex');
		})
		$('.vote_s .imgs').click(function(){
			if (num<=2) {
				return;
			}else{
				num--;
				$(this).parent('ul').hide();
			}
		})
	}
});
//发布
$('.save').on('click',function(){
	var tit = $('.title').val();
	var i_type = 0;
	var drs = $('.tarea').val();
	var arr = [];
	$('.vote_s .con').each(function(){
		arr.push({"content":$(this).val()});
	});
	var i_datas = {
		'title':tit,
		'type':i_type,
		'communityId':i_fish_id,
		'describe':drs,
		'votes':arr
	};
	var i_vote = JSON.stringify(i_datas);
	$.ajax({
		type:"POST",
		url: "http://47.92.96.194:8000/community/wordsVote/push",
		data:{
			"vote1":i_vote
		},
       	crossDomain: true,
		dataType: 'json',
		beforeSend: function(res){
			document.cookie = i_cookies+";path=/";
		},
		xhrFields:{
         	withCredentials: true
       	},
		success: function(data) {
			history.back(-1);
		},
		error: function(xhr, error, ex) {
			console.log("网络有问题！！！");
		}
	});
})



















