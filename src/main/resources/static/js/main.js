$(document).ready(function() {
	$("#search-form").submit(function(event) {

		// stop submit the form, we will post it manually.
		event.preventDefault();

		fire_ajax_submit();

	});

});

$('#logo').on('click', function(event) {
	  event.preventDefault(); // To prevent following the link (optional)
		$('#logTable').hide();
		$('#error').hide();
		$('#homeImage').show();
		$('#searchString').val('');		
		$('#date').val('');
	});

function fire_ajax_submit() {
	var search = {}
	search["searchString"] = $("#searchString").val();
	search["date"] = $("#date").val();

	$("#btn-search").prop("disabled", true);
    $('.search input').val('');
    $('#clienti').bootstrapTable('refresh', {
        query: {search: ''}
    });
    $('.search input').focus().val('').blur();
	//$('#clienti').bootstrapTable('refresh');
    $('#clienti').bootstrapTable("destroy");

	$
			.ajax({
				type : "POST",
				contentType : "application/json",
				url : "http://localhost:8080/search",
				data : JSON.stringify(search),
				dataType : 'json',
				crossDomain: true,
				cache : false,
				timeout : 600000,
				success : function(data) {
					$('#logTable').show();
					$('#error').hide();
					$('#homeImage').hide();
					$('#clienti').bootstrapTable({
						data : data
					});

					console.log("SUCCESS : ", data);
					$("#btn-search").prop("disabled", false);

				},
				error : function(e) {
					$('#logTable').hide();
					$('#error').show();
					$('#homeImage').hide();
					var json = "<h4>Response</h4><pre>" + e.responseText
							+ "</pre>";
					$('#error').html(json);

					console.log("ERROR : ", e);
					$("#btn-search").prop("disabled", false);

				}
			});

}