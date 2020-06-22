﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace WebApi.Domain.Identity
{
    public class User : IdentityUser<int>
    {
        [Column(TypeName ="nvarchar(150)")]
        public string fullName { get; set; }
        public List<UserRole> UserRoles { get; set; }
    }
}
