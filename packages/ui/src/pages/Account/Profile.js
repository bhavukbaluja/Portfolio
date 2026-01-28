import { Box, FormControl, Grid } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import BaseImageUpload from "@ui/components/UI/fields/BaseImageUpload";
import AvatarUploaderWithMenu from "@ui/components/UI/widgets/BaseAvatarUploaderWithMenu";
import { updateProfile_URL, URL_CONFIG, URL_Get_Profile_Img, URL_Upload_Profile_img } from "@utils/Config/URLs";
import { refreshUserInfo } from "@utils/helper/ApiConfig/API_Helper";
import { AuthContext } from "@utils/helper/ApiConfig/AuthProvider";
import { useCallApi } from "@utils/helper/CallApi";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { isEmpty, validateField } from "@utils/helper/Helper";
import { AccountServices } from "@utils/services/AccountServices";
import SetPassword from "./SetPassword";
import UserForm from "./UserForm"; // Import the separated component

const Profile = ({ isMobile, setLoading, showSnackBar, imageRefreshKey, setImageRefreshKey, loading }) => {

    const { CallApi } = useCallApi();
    const { lang } = useContext(LanguageContext);
    const { user, setUser } = useContext(AuthContext);
    const imageUploaderRef = useRef();
    const { updateDetails } = AccountServices();
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    
    // State for Primary Form Data
    const [formData, setFormData] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        dob: user?.dob,
        gender: user?.gender,
        mobile: user?.mobile,
    });
    const [errors, setErrors] = useState({});

    // State for Alternate Mobile Data
    const [formData2, setFormData2] = useState({
        mobile: user?.alternateMobile,
    });
    const [errors2, setErrors2] = useState({});

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                email: user?.email || "",
                dob: user?.dob || "",
                gender: user?.gender || "",
                mobile: user?.mobile || "",
                countryCode: "",
            });
            setFormData2({
                mobile: user?.alternateMobile || "",
                countryCode: "",
            });
        }
    }, [user]);

    const genderOpt = [
        { label: "female", value: "female" },
        { label: "male", value: "male" },
        { label: "others", value: "others" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log(value);

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (name in newErrors) delete newErrors[name];
            const error = validateField(name, value);
            if (error) newErrors[name] = error;
            return { ...newErrors };
        });
    };

    const handleImageUpload = async (event) => {
        const files = Array.from(event?.target?.files);
        if (!files || !Array.isArray(files) || files.length === 0) {
            console.warn("No valid files to upload.");
            return;
        }

        const file = files[0];
        if (file && imageUploaderRef.current) {
            setLoading(true);
            if (await imageUploaderRef.current.uploadImageFromParent(file)) {
                showSnackBar(Literal[lang].profileImgUpdated);
                setUser(await refreshUserInfo(CallApi));
                setImageRefreshKey(Date.now());
            }
        }
    }

    const handleCancel = () => {
        setFormData({
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            dob: user?.dob,
            gender: user?.gender,
            mobile: user?.mobile,
            countryCode: "",
        });
        setFormData2({
            mobile: user?.alternateMobile,
            countryCode: "",
        });
        setErrors({});
        setErrors2({});
    }

    const handleSave = async () => {
        setLoading(true);
        const jsonData = {
            id: user?.id,
            firstName: formData?.firstName,
            lastName: formData?.lastName,
            dob: formData?.dob ? dayjs(formData.dob).format("YYYY-MM-DD") : null,
            gender: formData?.gender,
            email: formData?.email,
            mobile: formData?.mobile,
            alternateMobile: formData2?.mobile,
            accountActive: user?.accountActive
        };

        await updateDetails(updateProfile_URL, jsonData)
            .then(async (response) => {
                showSnackBar(Literal[lang].profileUpdated);
                setUser(await refreshUserInfo(CallApi));
                setImageRefreshKey(Date.now());
            }).catch((error) => {
                // Handle error
            });
        setLoading(false);
    }

    return (
        <div className="middle-main-container" style={{ marginBottom: '26px' }}>
            <FormControl sx={{ maxWidth: '100%' }}>
                <h2 style={{ display: 'flex', justifyContent: "center" }}>{Literal[lang].updateProfile}</h2>
                <Grid
                    container
                    xs={12}
                    padding='10px 20px'
                    wrap={isMobile ? 'wrap' : "nowrap"}
                    justifyContent={isMobile ? "center" : "space-between"}
                    alignItems="flex-start"
                    spacing='30px'
                >
                    <Grid
                        item
                        xs={isMobile ? 12 : 4}
                        className="profile-center-align"
                        sx={{ minWidth: '300px', maxWidth: '100%' }}
                    >
                        <AvatarUploaderWithMenu
                            imageRefreshKey={imageRefreshKey}
                            user={user}
                            imageUrl={URL_CONFIG.API_URL + URL_Get_Profile_Img}
                            name={user?.firstName + " " + user?.lastName}
                            onImageUpdate={handleImageUpload}
                            size={300}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={isMobile ? 12 : 7}
                        className="profile-center-align"
                        sx={{ flexGrow: 1 }}
                    >
                        <UserForm
                            isMobile={isMobile}
                            lang={lang}
                            formData={formData}
                            setFormData={setFormData}
                            formData2={formData2}
                            setFormData2={setFormData2}
                            errors={errors}
                            setErrors={setErrors}
                            errors2={errors2}
                            setErrors2={setErrors2}
                            handleChange={handleChange}
                            genderOpt={genderOpt}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', flex: 1, minWidth: isMobile ? '100%' : '48%', justifyContent: isMobile ? "center" : "space-evenly", gap: 4, flexWrap: isMobile ? 'wrap' : "nowrap", maxWidth: '100%' }} >
                    <button type="button"
                        className="form-skip-button"
                        style={{ width: isMobile ? '90%' : '20%' }}
                        onClick={() => setPasswordDialogOpen(true)}
                    >
                        {Literal[lang].changePassword}
                    </button>
                    <button type="button"
                        className="form-cancel-button"
                        style={{ width: isMobile ? '90%' : '20%' }}
                        onClick={handleCancel}
                    >
                        {Literal[lang].cancel}
                    </button>
                    <button
                        type="submit"
                        className="form-button"
                        onClick={handleSave}
                        style={{ width: isMobile ? '90%' : '20%' }}
                        disabled={
                            formData?.firstName === "" ||
                            formData?.lastName === "" ||
                            (!isEmpty(validateField("email", formData?.email || ""))) ||
                            (!isEmpty(validateField("mobile", formData?.mobile || "")))
                        }
                    >
                        {Literal[lang].save}
                    </button>
                </Box>
            </FormControl>

            <BaseImageUpload
                upload_url={URL_Upload_Profile_img}
                imageUrl={URL_CONFIG.API_URL + URL_Get_Profile_Img}
                setLoading={setLoading}
                showSnackBar={showSnackBar}
                ref={imageUploaderRef}
                imageRefreshKey={imageRefreshKey}
                setImageRefreshKey={setImageRefreshKey}
                croppable={true}
                entity="profile"
            />

            <BaseDialog
                title={Literal[lang]?.updatePassword}
                setOpen={setPasswordDialogOpen}
                open={passwordDialogOpen}
                bodyComponent={
                    <SetPassword
                        lang={lang}
                        setLoading={setLoading}
                        loading={loading}
                        value={isEmpty(user?.email) ? user?.mobile : user?.email}
                        showSnackBar={showSnackBar}
                        action={"update"}
                        setDialogOpen={setPasswordDialogOpen}
                    />
                }
            />
        </div>
    )
}
export default Profile;