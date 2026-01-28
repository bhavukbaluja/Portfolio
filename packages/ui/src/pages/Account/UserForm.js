import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import BaseRadioGroup from "@ui/components/UI/fields/BaseRadioGroup";
import BaseDatePicker from "@ui/components/UI/fields/BaseDatePicker";
import BaseMobileField from "@ui/components/UI/fields/BaseMobileField";
import Literal from "@ui/literals";
import BaseSelect from "@ui/components/UI/fields/BaseSelect";
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';

const UserForm = ({ 
    isMobile, 
    lang, 
    entity,
    readOnly,
    formData, 
    setFormData, 
    formData2, 
    setFormData2, 
    errors, 
    setErrors, 
    errors2, 
    setErrors2, 
    handleChange, 
    genderOpt 
}) => {

    const { user } = useContext(AuthContext);
    const roleOptions = [
        { label: "User", value: "USER" },
        { label: "Manager", value: "MANAGER" },
        { label: "Admin", value: "ADMIN" },
      ];
    const accountActiveOpt = [
        { label: "Active", value: true },
        { label: "Inactive", value: false }
    ];

    // 1. Helper to convert String (from formData) -> Object (for BaseSelect)
    const getSelectedRole = () => {
        return roleOptions.find(opt => opt.value === formData.role) || null;
    };

    const handleSelect = (e) => {
        // 2. Helper to convert Object (from BaseSelect) -> String (for formData)
        // BaseSelect usually returns the full object in e.target.value
        const selectedOption = e.target.value; 
        const valueStr = selectedOption?.value || selectedOption; // Handle object or fallback

        setFormData((prev) => ({
        ...prev,
        role: valueStr,
        }));
    };
        
    return (
        <Box
            className="profile-attributes"
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 2,
                width: '100%',
                flexWrap: 'wrap',
            }}
        >
            {/* First Name */}
            <Box sx={{ flex: 1, minWidth: isMobile ? '100%' : '48%' }}>
                <BaseTextField2
                    id="firstName-input"
                    label="firstName"
                    name="firstName"
                    required
                    disabled={readOnly}
                    placeHolderText="firstNamePlaceHolder"
                    value={formData.firstName}
                    onChange={handleChange}
                    errorMsg={errors.firstName}
                />
            </Box>

            {/* Last Name */}
            <Box sx={{ flex: 1, minWidth: isMobile ? '100%' : '48%' }}>
                <BaseTextField2
                    id="lastName-input"
                    label="lastName"
                    name="lastName"
                    required
                    disabled={readOnly}
                    placeHolderText="lastNamePlaceHolder"
                    value={formData?.lastName}
                    onChange={handleChange}
                    errorMsg={errors?.lastName}
                />
            </Box>

            {/* Email */}
            <Box sx={{ flex: 1, minWidth: isMobile ? '100%' : '48%' }}>
                <BaseTextField2
                    id="email-input"
                    label="Email"
                    name="email"
                    required
                    placeHolderText="emailPlaceHolder"
                    disabled={readOnly}
                    value={formData.email}
                    onChange={handleChange}
                    errorMsg={errors.email}
                />
            </Box>

            {/* Date of Birth */}
            <Box sx={{ flex: 1, minWidth: isMobile ? '100%' : '48%' }}>
                <BaseDatePicker
                    label="dob"
                    name="dob"
                    required={false}
                    defaultValue={dayjs(formData?.dob)}
                    placeHolderText="dobPlaceholder"
                    disabled={readOnly}
                    value={dayjs(formData?.dob)}
                    onChange={(newValue) => setFormData((prev) => ({ ...prev, "dob": newValue }))}
                    errorMsg={errors?.dob}
                />
            </Box>

            {/* Mobile Number */}
            <Box sx={{ flex: 1, minWidth: isMobile ? '100%' : '48%' }}>
                <BaseMobileField
                    name="mobile"
                    formData={formData}
                    setFormData={setFormData}
                    disabled={readOnly}
                    errors={errors}
                    setErrors={setErrors}
                    required={true}
                />
            </Box>

            {/* Alternate Mobile */}
            <Box sx={{ flex: 1, minWidth: isMobile ? '100%' : '48%' }}>
                <BaseMobileField
                    label={Literal[lang].alternateMobile}
                    name="alternateMobile"
                    formData={formData2}
                    setFormData={setFormData2}
                    disabled={readOnly}
                    errors={errors2}
                    setErrors={setErrors2}
                    required={false}
                />
            </Box>

            {/* Gender */}
            <Box sx={{ flex: 1, minWidth: isMobile ? '100%' : '48%' }}>
                <BaseRadioGroup
                    title="genderLabel"
                    name="gender"
                    options={genderOpt}
                    defaultValue={formData?.gender}
                    disabled={readOnly}
                    value={formData?.gender}
                    onChange={(item) => setFormData((prev) => ({ ...prev, "gender": item }))}
                />
            </Box>

            {entity=="addOrUpdateUser" && (
                <>
                    {/* AccountActive */}
                    <Box sx={{ flex: 1, minWidth: isMobile ? '100%' : '48%' }}>
                        <BaseRadioGroup
                            title="accountActiveLabel"
                            name="accountActive"
                            requi
                            options={accountActiveOpt}
                            defaultValue={formData?.accountActive}
                            disabled={readOnly}
                            value={formData?.accountActive}
                            onChange={(item) => setFormData((prev) => ({ ...prev, "accountActive": item }))}
                        />
                    </Box>


                    <Box sx={{ flex: 1, minWidth: isMobile ? '100%' : '48%' }}>
                        <BaseSelect
                            label="role"
                            required={true}
                            name="role"
                            value={getSelectedRole()}
                            onChange={handleSelect}
                            placeHolderText="selectRolePlaceholder"
                            disabled={readOnly || user?.role!="ADMIN"}
                            options={roleOptions}
                        />
                    </Box>
                </>
            )}


            {/* Spacer Box for Alignment */}
            <Box sx={{ display: 'flex', flex: 1, minWidth: isMobile ? '100%' : '48%', justifyContent: "center", gap: 4 }}>
            </Box>
        </Box>
    );
}

export default UserForm;