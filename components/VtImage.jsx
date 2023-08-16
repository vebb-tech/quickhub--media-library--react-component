

export default ({ 
    figure, 
    img, 
    logo_id 
}) => {

    return <figure>
        <img src={`https://imagedelivery.net/${process.env.NEXT_PUBLIC_CF_ACCOUNT_HASH}/${logo_id}/public`} />
    </figure>

}