using RazorTest.Models;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

public class Premium
{
    [Key]
    [DisplayName("id")]
    public int Id { get; set; }

    [Required(ErrorMessage = "Name shouldn't be null")]
    [StringLength(80, ErrorMessage = "Name shouldn't have more than 80 chars")]
    [MinLength(5, ErrorMessage = "Name should have more than 5 chars")]
    [DisplayName("Fullname")]
    public string Name { get; set; } = string.Empty;

    [DataType(DataType.DateTime)]
    //[GreaterThanToday]
    [DisplayName("Start")]
    public DateTime StartDate { get; set; }

    [DataType(DataType.DateTime)]
    [DisplayName("End")]
    public DateTime EndDate { get; set; }

    [DisplayName("Student")]
    [Required(ErrorMessage = "Invalid student")]
    public int StudentId { get; set; }
}

