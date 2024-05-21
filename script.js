let table = new DataTable("#example", {
  ajax: "/data.json",
  columns: [{ data: "firstname" }, { data: "lastname" }, { data: null }],
  columnDefs: [
    {
      targets: -1,
      render: function (data, type, row) {
        var checkbox =
          '<button class="edit" data-id=' +
          data.id +
          ">Edit</button> <button class='save'>Save</button>";
        return checkbox;
      },
    },
    { targets: 0, className: "data" },
    { targets: 1, className: "data" },
  ],
  aoColumnDefs: [
    { bSortable: false, aTargets: [0, 1, 2, 3] },
    { bSearchable: false, aTargets: [0, 1, 2, 3] },
  ],
});
let counter = 1;
function addNewRow() {
  table.row
    .add({
      id: 5,
      firstname: "New",
      lastname: "Row",
    })
    .draw(false);

  counter++;
}

document.querySelector("#addRow").addEventListener("click", addNewRow);

$(document).on("click", ".edit", function () {
  $(this)
    .parent()
    .siblings("td.data")
    .each(function () {
      var content = $(this).html();
      $(this).html('<input value="' + content + '" />');
    });

  $(this).siblings(".save").show();
  $(this).siblings(".delete").hide();
  $(this).hide();
});

$(document).on("click", ".save", function () {
  let data = [];
  $("input").each(function (index) {
    var content = $(this).val();
    let dataTemp = [];
    data[index == 1 ? "firstname" : "lastname"] = content;
    $(this).html(content);
    $(this).contents().unwrap();
  });
  console.log(data);
  $(this).siblings(".edit").show();
  $(this).siblings(".delete").show();
  $(this).hide();

  $.put("/update", data).done(function (response) {
    alert("success");
  });
});
