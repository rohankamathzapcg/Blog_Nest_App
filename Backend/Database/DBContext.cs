﻿using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Database
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions options) : base(options) { }

        public DbSet<Blogs> BlogPost  { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
