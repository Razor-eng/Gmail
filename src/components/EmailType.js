import { Inbox, LocalOffer, People } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { openPrimary, openPromotions, openSocial, selectPrimary, selectPromotions, selectSocial } from '../features/mailSlice';

function EmailType() {
    const Primary = useSelector(selectPrimary)
    const Social = useSelector(selectSocial)
    const Promotions = useSelector(selectPromotions)
    const dispatch = useDispatch();
    return (
        <div className="type">

            <div className={`emailoptions ${Primary && 'emailactive'}`} onClick={() => dispatch(openPrimary())}>
                <Inbox />
                <p>Primary</p>
            </div>

            <div className={`emailoptions ${Social && 'emailactive'}`} onClick={() => dispatch(openSocial())}>
                <People />
                <p>Social</p>
            </div>

            <div className={`emailoptions ${Promotions && 'emailactive'}`} onClick={() => dispatch(openPromotions())}>
                <LocalOffer />
                <p>Promotions</p>
            </div>

        </div>
    )
}

export default EmailType
