import swal from "sweetalert";

export function Alert(dto){
    return(
        swal({
            title: dto.title,
            text: dto.text,
            icon: dto.icon,
            dangerMode: true,
           
          })
    )
}